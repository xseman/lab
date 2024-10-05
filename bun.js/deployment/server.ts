import process from "node:process";
import http from "node:http";

import express from "express";

const app = express();

app.get("/", (_req, res) => {
	res.send(`Hello Bun! ${process.env.VERSION}\n`);
});

app.get("/health", (_req, res) => {
	res.status(200).send("ok")
});

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
