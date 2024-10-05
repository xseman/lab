#!/usr/bin/env -S node --experimental-detect-module

console.profile();

function fibonacci(n) {
	if (n < 1) return 0;
	if (n <= 2) return 1;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

fibonacci(30);

console.profileEnd()
