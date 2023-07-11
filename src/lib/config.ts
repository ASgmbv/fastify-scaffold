/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { Type } from "@sinclair/typebox";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    authenticate: any;
    protect: (roles: string[]) => any;
  }
}

export const envSchema = Type.Object({
  DATABASE_URL: Type.String(),
  PORT: Type.Number(),
  NODE_ENV: Type.Enum({
    production: "production",
    development: "development",
  }),
  JWT_SECRET: Type.String(),
});
