import http from "node:http";

// @deno-types="npm:@types/express"
import express from "express";

const app = express();

app.get("/", (_req, res) => {
	console.log("Request received");
	res.send("Hello Deno!");
});

const server = http.createServer(app)

server.listen(3000, () => {
	console.log("Server running on port 3000");
});
