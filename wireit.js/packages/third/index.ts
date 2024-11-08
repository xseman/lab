import { first } from "@lab/first";
import { second } from "@lab/second";

export function third() {
	first();
	second();

	console.log("Hello from Package third");
}
