// deno run --allow-read main.ts

new Worker(
	// do some computing...
	new URL("./worker.ts", import.meta.url).href,
	{ type: "module" },
);

console.log("continue to execute...");
