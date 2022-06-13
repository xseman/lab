function* generator(i: number) {
	yield i;
	yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
// 10

console.log(gen.next().value);
// 20

function* anotherGenerator(i: number) {
	yield i + 1;
	yield i + 2;
	yield i + 3;
}

function* generatorNexted(i: number) {
	yield i;
	yield* anotherGenerator(i);
	yield i + 10;
}

var genNested = generatorNexted(10);

console.log("Nested:");
console.log(genNested.next().value); // 10
console.log(genNested.next().value); // 11
console.log(genNested.next().value); // 12
console.log(genNested.next().value); // 13
console.log(genNested.next().value); // 20

function* powers(n: number) {
	// endless loop to generate
	for (let current = n; ; current *= n) {
		yield current;
	}
}

for (let power of powers(2)) {
	//controlling generator
	if (power > 32) break;
	console.log(power);
	// 2
	// 4
	// 8
	// 16
	// 32
}

// Related
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
