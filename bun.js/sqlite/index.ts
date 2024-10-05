import { Database } from "bun:sqlite";
import cluster from "node:cluster";
import os from "node:os";

import express from "express";
import * as limit from "express-rate-limit";

class Store implements limit.Store {
	readonly _db: Database;

	constructor(filename: string) {
		this._db = new Database(filename, { create: true });
		this._db.exec("PRAGMA journal_mode = WAL;"); // https://bun.sh/docs/api/sqlite#wal-mode

		this._db
			.prepare(`DROP TABLE IF EXISTS ${filename};`)
			.run();

		this._db
			.prepare(
				`CREATE TABLE IF NOT EXISTS rate_limits (
					key TEXT PRIMARY KEY,
					request_count INTEGER DEFAULT 0
				)`
			).run();

		this._db
			.prepare("pragma busy_timeout = 5000;")
			.run();
	}

	increment(key: string): limit.ClientRateLimitInfo {
		const row = this._db
			.query("SELECT * FROM rate_limits WHERE key = ?")
			.get(key);

		if (row) {
			const { request_count } = row as { request_count: number; };

			console.log("PID", process.pid, "COUNT", request_count);

			this._db
				.prepare("UPDATE rate_limits SET request_count = request_count + 1 WHERE key = ?")
				.run(key);

			return {
				totalHits: request_count + 1,
				resetTime: undefined
			};
		}

		this._db
			.prepare("INSERT INTO rate_limits (key, request_count) VALUES (?, 1)")
			.run(key);

		return {
			totalHits: 1,
			resetTime: undefined
		};
	}

	async decrement(key: string): Promise<void> {
		this._db
			.prepare("UPDATE rate_limits SET request_count = request_count - 1 WHERE key = ?")
			.run(key);
	}

	async resetKey(key: string): Promise<void> {
		this._db
			.prepare("DELETE FROM rate_limits WHERE key = ?")
			.run(key);
	}
}

function bootstrap() {
	const app = express();

	const globalLimiter = limit.rateLimit({
		store: new Store("global.sqlite"),
		windowMs: 1 * 60 * 1000, // 1 minute
		max: 100,
		message: "Too many requests from this IP.",
		keyGenerator: (req, _res) => req.ip as string,
		handler: (_req, res) => {
			res.status(429).json({ message: "Too many requests from this IP." });
		}
	});

	app.use(globalLimiter)

	app.get("/", (_req, res) => {
		res.status(200).json({ message: "Root!" });
	});

	const helloLimiter = limit.rateLimit({
		store: new Store("hello.sqlite"),
		windowMs: 1 * 60 * 1000 / 2, // 30s
		max: 10,
		message: "Too many requests from this IP.",
		keyGenerator: (req, _res) => req.ip as string,
		handler: (_req, res) => {
			res.status(429).json({ message: "Too many requests from this IP." });
		}
	});

	app.get("/hello", helloLimiter, (_req, res) => {
		res.status(200).json({ message: "Hello, world!" });
	});

	return app;
}

if (cluster.isPrimary) {
	for (let i = 0; i < os.cpus().length; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker) => {
		console.warn(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const app: express.Express = bootstrap();

	app.listen(8080, "localhost", () => {
		console.log(`Express server listening at http://localhost:${8080}`);
	});
}
