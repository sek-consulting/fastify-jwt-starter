import { FastifyPluginAsync, FastifyRequest } from "fastify";

import { getUserById } from "../../services/user";

const users: FastifyPluginAsync = async (server) => {
  server.addHook("onRequest", server.authenticate);

  server.get("/:id", async (request: FastifyRequest<{ Params: { id: number } }>, reply) => {
    const id = request.params.id;
    const user = await getUserById(id);
    if (user) {
      return reply.status(200).send({ user });
    }
    return reply.notFound();
  });
};

export default users;
