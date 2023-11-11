import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { AddressInfo } from "node:net";
import http from "node:http";

import { html } from "lit";
import express from "express";

import { render } from "@lit-labs/ssr/lib/render.js";
import { RenderResultReadable } from '@lit-labs/ssr/lib/render-result-readable.js';

import "@lit-labs/ssr/lib/install-global-dom-shim.js";
import "@lit-labs/ssr/lib/render-lit-html.js";

import './click-me.js'
import './text-input.js'

declare global {
    namespace Express {
        interface Application {}
        interface Request {}
    }
}

function bootstrap() {
	const app = express();

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json({ limit: "2mb" }));

	const staticPath = path.join(dirname(fileURLToPath(import.meta.url)), "public");
	app.use(express.static(staticPath));

	app.get('/', (_res, res, _next) => {
		const demo = html`
			<script type="module" src="./polyfills.js"></script>

			<script type="module" src="./click-me.js"></script>
			<script type="module" src="./text-input.js"></script>

			<script type="module" src="./dynamic-hydratate.js"></script>

			<h1>Demo</h1>
			<click-me></click-me>
			<text-input></text-input>
		`

		res.set('Content-Type', 'text/html');
		new RenderResultReadable(render(demo)).pipe(res);
	});

	return app;
}

const app = bootstrap();
const server = http.createServer(app);
server.listen(9000, 'localhost', () => {
    const addr = server.address() as AddressInfo;
    console.info("http server listening: http://%s:%s", addr.address, addr.port);
});
