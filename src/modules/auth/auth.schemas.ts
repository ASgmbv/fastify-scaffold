import { Type } from "@sinclair/typebox";

const login = {
	body: Type.Object({
		email: Type.String(),
		password: Type.String(),
	}),
	response: Type.Object({
		user: Type.Object({
			id: Type.Number(),
		}),
	}),
};

export default {
	login,
};
