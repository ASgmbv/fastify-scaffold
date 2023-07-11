import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

async function jwtAuth(app: FastifyInstance) {
	app.decorate(
		"authenticate",
		async function (req: FastifyRequest, res: FastifyReply) {
			try {
				await req.jwtVerify();
			} catch (err) {
				res.send(err);
			}
		}
	);
}

export default fp(jwtAuth);
