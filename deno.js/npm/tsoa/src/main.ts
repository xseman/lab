// @deno-types="npm:@types/express"
import express from "npm:express";
// @deno-types="npm:@types/swagger-ui-express"
import swaggerUi from "npm:swagger-ui-express";

import { generateSpecAndRoutes } from "npm:tsoa";

await generateSpecAndRoutes({
	basePath: "/api",
	configuration: {
		entryFile: "src/main.ts",
		noImplicitAdditionalProperties: "throw-on-extras",
		controllerPathGlobs: ["./src/*Controller.ts"],
		spec: {
			outputDirectory: "./generated/",
			specVersion: 3,
			securityDefinitions: {
				jwt: {
					type: "apiKey",
					in: "header",
					name: "x-access-token",
				},
			},
		},
		routes: {
			basePath: "/api",
			routesDir: "./generated/",
			// authenticationModule: "./src/middlewares/authentication.ts",
		},
	},
});

/** @ts-ignore: runtime generated */
const { RegisterRoutes } = await import("../generated/routes.ts");

export const app = express();

app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(express.json()); // Parse application/json

RegisterRoutes(app);

/** @ts-ignore: runtime generated */
// const { default } = await import("../generated/swagger.json", { assert: { type: "json" } });

import swagger from "../generated/swagger.json" assert { type: "json" };
const swaggerUiHandler = swaggerUi.setup(swagger);

app.get("/docs/swagger.json", (_, res) => res.json(swagger));
app.use("/docs", swaggerUi.serve, swaggerUiHandler);

const port = 4_000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
