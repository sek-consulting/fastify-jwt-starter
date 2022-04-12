import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.addHook("onRequest", fastify.authenticate);

  fastify.get("/", async (_, reply) => {
    reply.status(200).send({ messsage: "you found the treasure!" });
  });
};

export default root;
