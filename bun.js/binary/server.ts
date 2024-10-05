import http from "node:http";

import express from "express";

const app = express();

app.get("/", (_req, res) => {
	console.log("Request received");
	res.send("Hello Bun!");
});

const server = http.createServer(app)

server.listen(3000, () => {
	console.log("Server running on port 3000");
});
