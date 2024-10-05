// @deno-types="@types/lodash"
import lodash from "lodash";

const data = [
	{ name: "Anna", age: 25 },
	{ name: "Filip", age: 25 },
	{ name: "Juraj", age: 32 },
	{ name: "Marta", age: 15 },
];

console.log(lodash.groupBy(data, (data) => data.age));
// {
// 	"15": [ { name: "Marta", age: 15 } ],
// 	"25": [ { name: "Anna", age: 25 }, { name: "Filip", age: 25 } ],
// 	"32": [ { name: "Juraj", age: 32 } ]
// }

// deno run ./main.ts
