import Bun from "bun";
import process from "node:process";

if (process.send === undefined) {
	throw new Error("This script must be run as a child process");
}

// Pong message back to the parent process
process.on("message", (message) => {
	process.send!(`Received message: ${message}`);
});

// Sending messages to the parent process
for (let i = 0; i < 10; i++) {
	process.send({
		count: i,
		message: "Message from child as object",
	});

	await Bun.sleep(2_000);
}
