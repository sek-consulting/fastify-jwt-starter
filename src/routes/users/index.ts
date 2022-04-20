import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { getUserById } from "../../services/user";

const users: FastifyPluginAsync = async (server): Promise<void> => {
  server.addHook("onRequest", server.authenticate);

  server.get("/me", async (_, reply) => {
    const payload = server.jwt.payload;
    if (payload) {
      const user = await getUserById(payload.id);
      if (user) {
        reply.status(200).send({ user });
      }
    }
    reply.notFound();
  });

  server.get(
    "/:id",
    async (
      request: FastifyRequest<{
        Params: {
          id: number;
        };
      }>,
      reply
    ) => {
      const id = request.params.id;
      const user = await getUserById(id);
      if (user) {
        reply.status(200).send({ user });
      } else {
        reply.notFound();
      }
    }
  );
};

export default users;
