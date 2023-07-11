import { Static } from "@sinclair/typebox";
import { RouteHandler } from "fastify";
import authSchemas from "./auth.schemas";

const login: RouteHandler<{
	Body: Static<typeof authSchemas.login.body>;
	Reply: Static<typeof authSchemas.login.response>;
}> = async (req, res) => {
	const { email, password } = req.body;

	const users = [
		{
			email: "email",
			password: "password",
		},
	];

	const user = users.find((u) => u.email === email);

	if (!user) {
		throw req.server.httpErrors.notFound("User Not Found");
	}

	if (user.password !== password) {
		throw req.server.httpErrors.unauthorized("Incorrect Password");
	}

	const token = await res.jwtSign({
		email,
	});

	return res.code(200).send({
		token,
		user,
	});
};

export default {
	login,
};
