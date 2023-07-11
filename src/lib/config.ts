import { Type } from "@sinclair/typebox";

export const envSchema = Type.Object({
	PORT: Type.Number(),
	NODE_ENV: Type.Enum({
		production: "production",
		development: "development",
	}),
});
