import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      role: string;
      email: string;
    };
  }
}

async function jwtAuth(app: FastifyInstance) {
  app.decorate(
    "authenticate",
    async function (req: FastifyRequest, res: FastifyReply) {
      try {
        await req.jwtVerify();
      } catch (err) {
        res.send(err);
      }
    },
  );

  app.decorate("protect", function (roles: string[]) {
    return async function protect(req: FastifyRequest) {
      const role = req.user.role;

      if (!roles.includes(role)) {
        throw app.httpErrors.forbidden();
      }
    };
  });
}

export default fp(jwtAuth);
