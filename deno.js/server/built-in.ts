const port = 3333;
const server = Deno.listen({ port });
console.log(`HTTP webserver running: http://localhost:${port}/`);

// Connections to the server will be yielded up as an async iterable.
for await (const conn of server) {
	// In order to not be blocking, we need to handle each connection
	// individually without awaiting the function
	serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
	// This "upgrades" a network connection into an HTTP connection.
	const httpConn = Deno.serveHttp(conn);
	// Each request sent over the HTTP connection will be yielded as an async
	// iterator from the HTTP connection.
	for await (const req of httpConn) {
		// The native HTTP server uses the web standard `Request` and `Response`
		// objects.
		const body = [
			"Your user-agent:\n\n",
			req.request.headers.get("user-agent") ?? "Unknown",
		].join("");

		// The requestEvent's `.respondWith()` method is how we send the
		// response back to the client.
		const res = new Response(body, { status: 200 });
		req.respondWith(res);
	}
}
