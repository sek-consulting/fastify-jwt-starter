import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (server) => {
  server.get("/", async (_, reply) => {
    reply.status(200).send({ hello: "world" });
  });
};

export default root;
