#!/usr/bin/env -S node --experimental-detect-module --inspect-wait --experimental-network-inspection

// nvm use v22.6
// open chrome nodejs tool

globalThis.setInterval(async () => {
	console.log("fetching...")
	await fetch("http://example.com");
}, 3_000)

