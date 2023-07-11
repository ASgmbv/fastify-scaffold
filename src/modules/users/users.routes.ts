import { FastifyInstance } from "fastify";
import usersSchemas from "./users.schemas";
import usersControllers from "./users.controllers";

export const autoPrefix = "/users";

export default async function (app: FastifyInstance) {
  app.get(
    "/testUser",
    {
      schema: {
        response: {
          200: usersSchemas.getTestUser.response,
        },
      },
    },
    usersControllers.getTestUser,
  );

  app.get(
    "/",
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onRequest: app.auth([app.authenticate]) as any,
      schema: {
        querystring: usersSchemas.getUsers.queryString,
        response: {
          200: usersSchemas.getUsers.response,
        },
      },
    },
    usersControllers.getUsers,
  );
}
