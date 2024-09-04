import cluster from "node:cluster";
import os from "node:os";
import sqlite from "node:sqlite";

import express from "express";
import * as limit from "express-rate-limit";

export default class Store implements limit.Store {
	private readonly _db: sqlite.DatabaseSync;

	private windowMs!: number;
	private interval?: NodeJS.Timeout;

	public readonly prefix: string;

	constructor(filename: string) {
		this.prefix = filename;

		this._db = new sqlite.DatabaseSync(filename);
		this._db.exec("PRAGMA journal_mode = WAL;");

		this._db
			.prepare('pragma busy_timeout = 5000;')
			.run();

		this._db
			.prepare(
				`CREATE TABLE IF NOT EXISTS rate_limits (
					key TEXT PRIMARY KEY,
					total_hits INTEGER DEFAULT 0,
					reset_time INTEGER
				)`
			)
			.run();

		this._db
			.prepare('DELETE FROM rate_limits')
			.run();
	}

	init(options: limit.Options): void {
		this.windowMs = options.windowMs;

		if (this.interval) {
			clearInterval(this.interval);
		}

		this.interval = globalThis.setInterval(
			this._clearExpired,
			this.windowMs
		);

		if (this.interval.unref) {
			this.interval.unref();
		}
	}

	get(key: string) {
		const row = this._db
			.prepare('SELECT total_hits, reset_time FROM rate_limits WHERE key = ?')
			.get(key) as { total_hits: number; reset_time: number; } | undefined;

		if (row) {
			return {
				totalHits: row.total_hits,
				resetTime: new Date(row.reset_time),
			};
		}

		return undefined;
	}

	increment(key: string): limit.IncrementResponse {
		const now = Date.now();
		const newResetTime = now + this.windowMs;

		const row = this._db
			.prepare(`
				INSERT INTO rate_limits (key, total_hits, reset_time)
				VALUES (?, 1, ?)
				ON CONFLICT(key) DO UPDATE SET
					total_hits = CASE
						WHEN reset_time > ? THEN total_hits + 1
						ELSE 1
					END,
					reset_time = CASE
						WHEN reset_time > ? THEN reset_time
						ELSE ?
					END
				RETURNING total_hits, reset_time
			`)
			.get(key, newResetTime, now, now, newResetTime) as { total_hits: number; reset_time: number; };

		console.log(`PID(${process.pid})`, `Hits(${row.total_hits})`);

		return {
			totalHits: row.total_hits,
			resetTime: new Date(row.reset_time),
		};
	}

	decrement(key: string): void {
		const row = this._db
			.prepare('SELECT total_hits FROM rate_limits WHERE key = ?')
			.get(key) as { total_hits: number; } | undefined;

		if (row && row.total_hits > 0) {
			this._db
				.prepare('UPDATE rate_limits SET total_hits = total_hits - 1 WHERE key = ?')
				.run(key);
		}
	}

	resetKey(key: string): void {
		this._db
			.prepare('DELETE FROM rate_limits WHERE key = ?')
			.run(key);
	}

	resetAll(): void {
		this._db
			.prepare('DELETE FROM rate_limits')
			.run();
	}

	shutdown(): void {
		clearInterval(this.interval);
		this._db.close();
	}

	private _clearExpired = (): void => {
		const now = Date.now();
		this._db
			.prepare('DELETE FROM rate_limits WHERE reset_time <= ?')
			.run(now);
	};
}

function bootstrap() {
	const app = express();

	const globalLimiter = limit.rateLimit({
		store: new Store("global.sqlite"),
		windowMs: 1 * 60 * 1000, // 1 minute
		max: 100,
		keyGenerator: (req, _res) => req.ip as string,
		handler: (_req, res) => {
			res.status(429).json({ message: "Too many requests from this IP." });
		}
	});

	app.use(globalLimiter);

	app.get('/', (_req, res) => {
		res.status(200).json({ message: 'Root!' });
	});

	const helloLimiter = limit.rateLimit({
		store: new Store("hello.sqlite"),
		windowMs: 1000 * 30, // 30 second
		max: 10,
		keyGenerator: (req, _res) => req.ip as string,
		handler: (_req, res) => {
			res.status(429).json({ message: "Too many requests from this IP." });
		}
	});

	app.get('/hello', helloLimiter, (_req, res) => {
		res.status(200).json({ message: 'Hello, world!' });
	});

	return app;
}

const app: express.Express = bootstrap();

if (cluster.isPrimary) {
	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker) => {
		console.warn(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	app.listen(8080, "localhost", () => {
		console.log(`Express server listening at http://localhost:${8080}`);
	});
}
