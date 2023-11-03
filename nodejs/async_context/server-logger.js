#!/usr/bin/env -S node --experimental-detect-module
// node v21.1.0

// @ts-check
import http from 'node:http';
import { AsyncLocalStorage } from 'node:async_hooks';

import { logger } from "./logger.js";

export const loggerContext = new AsyncLocalStorage();

let idSeq = 0;
const server = http.createServer((_req, res) => {
	loggerContext.run(idSeq++, () => {
		logger('start');
		// Imagine any chain of async operations here
		setTimeout(() => {
			logger('finish');
			res.end();
		}, Math.random() * 5_000);
	});
});

server.listen(8080);

for (let i = 0; i < 10; i++) {
	http.get('http://localhost:8080');
}
