async function handle(conn: Deno.Conn) {
	const httpConn = Deno.serveHttp(conn);
	for await (const requestEvent of httpConn) {
		await requestEvent.respondWith(handleReq(requestEvent.request));
	}
}

function handleReq(req: Request): Response {
	const upgrade = req.headers.get("upgrade") || "";
	if (upgrade.toLowerCase() != "websocket") {
		return new Response("request isn't trying to upgrade to websocket.");
	}
	const { socket, response } = Deno.upgradeWebSocket(req);
	socket.onopen = () => console.log("socket opened");
	socket.onmessage = (e) => {
		console.log("socket message:", e.data);
		socket.send(new Date().toString());
	};
	socket.onerror = (e) => console.log("socket errored:", e.message);
	socket.onclose = () => console.log("socket closed");
	return response;
}
