import fastifyJwt, { FastifyJWTOptions } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import { JwtPayload } from "../entities/jwt-payload";

declare module "@fastify/jwt" {
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
export default fp<FastifyJWTOptions>(async (server) => {
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecretpasswordthatnobodyshouldknow",
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const payload = await request.jwtVerify();
        server.jwt.payload = payload as JwtPayload;
      } catch (err) {
        return reply.send(err);
      }
    }
  );
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): void;
  }
}
