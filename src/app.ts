import fastify, { FastifyInstance } from "fastify";
import FastifyCors from "@fastify/cors";
import FastifyEnv from "@fastify/env";
import FastifyJWT from "@fastify/jwt";
import FastifySensible from "@fastify/sensible";
import FastifyAutoload from "@fastify/autoload";
import path from "path";
import { envSchema } from "./lib/config";
import auth from "./plugins/auth";

export function buildServer() {
	const app: FastifyInstance = fastify({
		logger: {
			transport: {
				target: "pino-pretty",
				options: {
					colorize: true,
					translateTime: "HH:MM:ss Z",
					ignore: "pid,hostname",
				},
			},
		},
		ignoreTrailingSlash: true,
	});

	app.register(FastifyEnv, {
		dotenv: true,
		schema: envSchema,
	});

	app.register(FastifyCors);

	app.register(FastifySensible);

	app.register(FastifyJWT, {
		secret: process.env.JWT_SECRET as string,
	});

	app.register(auth);

	app.register(FastifyAutoload, {
		dir: path.join(__dirname, "modules"),
		indexPattern: /.*routes.(ts|js)/,
		dirNameRoutePrefix: false,
		options: {
			prefix: "/api/v1",
		},
	});

	return app;
}
