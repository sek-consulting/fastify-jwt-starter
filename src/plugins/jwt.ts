import fp from "fastify-plugin";
import fastifyJwt, { FastifyJWTOptions } from "fastify-jwt";

/**
 * This plugins adds some utilities to handle jwt & authentication
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp<FastifyJWTOptions>(async (fastify, _) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecretpasswordthatnobodyshouldknow",
  });

  fastify.decorate("authenticate", async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

declare module "fastify" {
  export interface FastifyInstance {
    // insert all decorate functions here:
    authenticate(): void;
  }
}
