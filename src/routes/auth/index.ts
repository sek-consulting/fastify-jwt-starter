import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { login } from "../../services/auth";
import { LoginData } from "../../entities/login-data";

const auth: FastifyPluginAsync = async (server): Promise<void> => {
  server.post(
    "/login",
    async (request: FastifyRequest<{ Body: LoginData }>, reply) => {
      const user = await login(request.body);
      if (user) {
        const accessToken = await reply.jwtSign({
          id: user.id,
          name: user.name,
        });
        reply.status(200).send({ token: accessToken });
      } else {
        reply.unauthorized();
      }
    }
  );
};

export default auth;
