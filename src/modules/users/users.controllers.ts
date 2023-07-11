import { Static } from "@sinclair/typebox";
import { RouteHandler } from "fastify";
import usersSchemas from "./users.schemas";

const getTestUser: RouteHandler<{
  Reply: Static<typeof usersSchemas.getTestUser.response>;
}> = async (req, res) => {
  return res.code(200).send({
    user: {
      email: "hello@world.com",
    },
  });
};

const getUsers: RouteHandler<{
  Querystring: Static<typeof usersSchemas.getUsers.queryString>;
  Reply: Static<typeof usersSchemas.getUsers.response>;
}> = async (req, res) => {
  const { limit = 10 } = req.query;

  const users = await req.server.prisma.user.findMany({
    take: limit,
  });

  return res.code(200).send({
    users,
  });
};

export default {
  getUsers,
  getTestUser,
};
