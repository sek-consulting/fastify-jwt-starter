import fp from "fastify-plugin";
import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";

export default fp<FastifyCorsOptions>(async (server) => {
  server.register(fastifyCors, {
    origin: "*",
  });
});
