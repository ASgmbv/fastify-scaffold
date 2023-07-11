import { Type } from "@sinclair/typebox";

const getUser = {
	params: Type.Object({
		userId: Type.Number(),
	}),
	response: Type.Object({
		user: Type.Object({
			id: Type.Number(),
		}),
	}),
};

export default {
	getUser,
};
