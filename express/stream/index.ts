import stream from 'node:stream';
import http from 'node:http';

import express from 'express';

const app = express();

app.get('/plain', (_req, res, _next) => {
	res.setHeader('Content-Type', 'text/html');

	const readable = stream.Readable.from([
		"this", "is", "readable", "stream"
	].map(s => s + "<br>"));

	const delay = new stream.Transform({
		transform(chunk, _enc, cb) {
			globalThis.setTimeout(cb, 1_000, null, chunk);
		}
	});

	return readable
		.pipe(delay)
		.pipe(res);
});

app.get('/file', async (_req, res, _next) => {
	res.setHeader('Content-Type', 'application/octet-stream');
	res.setHeader('Content-Disposition', 'attachment; filename="file.txt"');

	const pass = new stream.PassThrough();

	let i = 0;
	const interval = globalThis.setInterval(() => {
		pass.write(i.toString());
		console.log(`Stream download ${i}/3`);

		if (i++ === 3) {
			pass.end();
			globalThis.clearInterval(interval);
		}
	}, 1_000);

	return pass.pipe(res);
});

const _server = http.createServer(app).listen(3000);

console.log("server started http://localhost:3000");
