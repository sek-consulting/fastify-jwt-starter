import { FastifyPluginAsync, FastifyRequest } from "fastify";

import { LoginData } from "@/entities/login-data";
import { login } from "@/services/auth";

const auth: FastifyPluginAsync = async (server) => {
  server.post(
    "/login",
    async (request: FastifyRequest<{ Body: LoginData }>, reply) => {
      const user = await login(request.body);
      if (user) {
        const accessToken = await reply.jwtSign({ id: user.id });
        return reply.status(200).send({
          token: accessToken,
        });
      }
      reply.unauthorized();
    }
  );
};

export default auth;
