import { Static } from "@sinclair/typebox";
import { RouteHandler } from "fastify";
import usersSchemas from "./users.schemas";

const getUser: RouteHandler<{
	Params: Static<typeof usersSchemas.getUser.params>;
	Reply: Static<typeof usersSchemas.getUser.response>;
}> = async (req, reply) => {
	const { userId } = req.params;

	const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	if (!users.includes(userId)) {
		throw req.server.httpErrors.notFound("User Not Found");
	}

	reply.code(200).send({
		user: {
			id: userId,
		},
	});
};

export default {
	getUser,
};
