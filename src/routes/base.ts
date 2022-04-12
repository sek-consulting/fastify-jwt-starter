import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async (_, reply) => {
    reply.status(200).send({ hello: "world" });
  });
};

export default root;
