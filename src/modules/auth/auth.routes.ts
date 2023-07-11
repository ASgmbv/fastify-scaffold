import { FastifyInstance } from "fastify";
import authSchemas from "./auth.schemas";
import authControllers from "./auth.controllers";

export default async function (app: FastifyInstance) {
	app.post(
		"/login",
		{
			schema: {
				body: authSchemas.login.body,
				response: {
					200: authSchemas.login.response,
				},
			},
		},
		authControllers.login
	);
}
