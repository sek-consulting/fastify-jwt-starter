import fp from "fastify-plugin";
import fastifyJwt, { FastifyJWTOptions } from "fastify-jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import { JwtPayload } from "../entities/jwt-payload";
import { verifyPayload } from "../services/jwt";

declare module "fastify-jwt" {
  // payload declarations
  interface FastifyJWT {
    payload: JwtPayload;
  }
  // server.jwt extension
  interface JWT {
    payload: JwtPayload;
  }
}

/**
 * This plugins adds some utilities to handle jwt & authentication
 *
 * @see https://github.com/fastify/fastify-jwt
 */
export default fp<FastifyJWTOptions>(async (server, _) => {
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecretpasswordthatnobodyshouldknow",
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const payload = await request.jwtVerify();
        const verified = verifyPayload(payload);
        if (!verified) {
          reply.unauthorized();
        } else {
          server.jwt.payload = verified;
        }
      } catch (err) {
        reply.send(err);
      }
    }
  );
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): void;
  }
}
