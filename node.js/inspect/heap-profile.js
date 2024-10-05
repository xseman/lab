#!/usr/bin/env -S node --experimental-detect-module

import { Session } from 'node:inspector/promises';
import fs from 'node:fs';

const session = new Session();

const fd = fs.openSync('profile.heapprofile', 'w');

session.connect();
session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
	fs.writeSync(fd, m.params.chunk);
});

const foo = new Array(1_000_000);

const result = await session.post('HeapProfiler.takeHeapSnapshot', null);
console.log('HeapProfiler.takeHeapSnapshot done:', result);

session.disconnect();
fs.closeSync(fd);
