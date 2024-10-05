#!/usr/bin/env -S node --experimental-detect-module

import { Session } from 'node:inspector/promises';
import fs from 'node:fs';

const session = new Session();
session.connect();

await session.post('Profiler.enable');
await session.post('Profiler.start');
// Invoke business logic under measurement here...

function fibonacci(n) {
	if (n < 1) return 0;
	if (n <= 2) return 1;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(30));

// some time later...
const { profile } = await session.post('Profiler.stop');

// Write profile to disk, upload, etc.
fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
