import { FastifyInstance } from "fastify";
import usersSchemas from "./users.schemas";
import usersControllers from "./users.controllers";

export const autoPrefix = "/users";

export default async function (app: FastifyInstance) {
	app.get(
		"/:userId",
		{
			schema: {
				params: usersSchemas.getUser.params,
				response: {
					200: usersSchemas.getUser.response,
				},
			},
		},
		usersControllers.getUser
	);
}
