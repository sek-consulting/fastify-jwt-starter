import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { login } from "../../services/auth";
import { LoginData } from "../../entities/login-data";

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post(
    "/login",
    async (request: FastifyRequest<{ Body: LoginData }>, reply) => {
      const user = await login(request.body);
      if (user) {
        const accessToken = await reply.jwtSign({
          data: { id: user.id },
        });
        reply.status(200).send({ token: accessToken });
      }
      reply.unauthorized();
    }
  );
};

export default auth;
