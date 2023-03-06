import { FastifyPluginAsync, FastifyRequest } from "fastify";

import { createTokens, login, refreshTokens } from "../../services/auth";

const auth: FastifyPluginAsync = async (server) => {
  server.post(
    "/login",
    async (request: FastifyRequest<{ Body: { email: string; password: string } }>, reply) => {
      const user = await login(request.body.email, request.body.password);
      if (user) {
        const tokens = await createTokens(user.id);
        return reply.status(200).send(tokens);
      }
      return reply.unauthorized();
    }
  );

  server.post(
    "/refresh",
    async (request: FastifyRequest<{ Body: { refreshToken: string } }>, reply) => {
      try {
        const tokens = await refreshTokens(request.body.refreshToken);
        return reply.status(200).send(tokens);
      } catch (err) {
        return reply.status(401).send(err);
      }
    }
  );
};

export default auth;
