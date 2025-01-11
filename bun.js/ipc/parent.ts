import Bun from "bun";

const child = Bun.spawn(["bun", "child.ts"], {
	ipc: (message, _) => {
		console.log(message);
	},
});

// Ping messages to the child process
for (let i = 0; i < 10; i++) {
	child.send("I am your father: " + i);

	await Bun.sleep(1_000);
}
