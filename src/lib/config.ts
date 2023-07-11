import { Type } from "@sinclair/typebox";

declare module "fastify" {
	interface FastifyInstance {
		user: "John Doe";
	}
}

export const envSchema = Type.Object({
	PORT: Type.Number(),
	NODE_ENV: Type.Enum({
		production: "production",
		development: "development",
	}),
	JWT_SECRET: Type.String(),
});
