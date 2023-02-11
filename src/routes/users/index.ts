import { FastifyPluginAsync, FastifyRequest } from "fastify";

import { getUserById } from "../../services/user";

const users: FastifyPluginAsync = async (server) => {
  server.addHook("onRequest", server.authenticate);

  server.get("/me", async (_, reply) => {
    const payload = server.jwt.payload;
    const user = await getUserById(payload.id);
    if (user) {
      return reply.status(200).send({ user });
    }
    reply.notFound();
  });

  server.get(
    "/:id",
    async (request: FastifyRequest<{ Params: { id: number } }>, reply) => {
      const id = request.params.id;
      const user = await getUserById(id);
      if (user) {
        return reply.status(200).send({ user });
      }
      reply.notFound();
    }
  );
};

export default users;
