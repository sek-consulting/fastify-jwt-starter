import { FastifyReply, FastifyRequest } from "fastify"
import fp from "fastify-plugin"

import { AccessTokenPayload } from "../entities/jwt-payloads"
import { verifyToken } from "../services/auth"

/**
 * This plugins handles authentication
 */
export default fp(async (server) => {
  server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.unauthorized()
    }
    try {
      const token = authHeader.substring(7)
      server.jwtPayload = verifyToken(token) as AccessTokenPayload
    } catch (err) {
      return reply.status(401).send(err) // unauthorized
    }
  })
})

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): void
    jwtPayload: AccessTokenPayload
  }
}
