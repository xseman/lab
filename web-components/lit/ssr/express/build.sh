#!/bin/bash

npx esbuild --splitting --bundle --format=esm --target=esnext --outdir=./public \
	./click-me.ts \
	./text-input.ts \
	./dynamic-hydratate.ts \
	./polyfills.ts
