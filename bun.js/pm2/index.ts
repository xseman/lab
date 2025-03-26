import process from "node:process";

import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Add request logging middleware
app.use((req, res, next) => {
	console.log(`[PID: ${process.pid}] ${req.method} ${req.url}`);
	next();
});

app.get("/", (req, res) => {
	const message = `Hello from Bun Express! Running on PID: ${process.pid}`;
	res.send(message);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
	console.log(`Process ID: ${process.pid}`);
});
