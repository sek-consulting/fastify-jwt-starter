import fp from "fastify-plugin";
import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";

/**
 * This plugins enables the use of CORS
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (server) => {
  server.register(fastifyCors, {
    origin: "*",
  });
});
