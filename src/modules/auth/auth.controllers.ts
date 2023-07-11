import { Static } from "@sinclair/typebox";
import { RouteHandler } from "fastify";
import authSchemas from "./auth.schemas";
import { comparePassword, hashPassword } from "../../lib/utils";

const register: RouteHandler<{
  Body: Static<typeof authSchemas.register.body>;
  Reply: Static<typeof authSchemas.register.response>;
}> = async (req, res) => {
  const body = req.body;

  const email = body.email.trim();
  const password = body.password;

  const existingUser = await req.server.prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw req.server.httpErrors.conflict("User Already Exists");
  }

  const hashedPassword = await hashPassword(password.trim());

  const newUser = await req.server.prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const token = await res.jwtSign({
    email,
  });

  return res.code(200).send({
    token,
    user: newUser,
  });
};

const login: RouteHandler<{
  Body: Static<typeof authSchemas.login.body>;
  Reply: Static<typeof authSchemas.login.response>;
}> = async (req, res) => {
  const body = req.body;

  const email = body.email.trim();
  const password = body.password;

  const user = await req.server.prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw req.server.httpErrors.notFound("User Not Found");
  }

  if (!comparePassword(password, user.password)) {
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
  register,
};
