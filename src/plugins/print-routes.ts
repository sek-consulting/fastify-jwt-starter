import fp from "fastify-plugin";

/**
 * This plugin prints an overview of
 *
 * @see https://github.com/ShogunPanda/fastify-print-routes
 */
export default fp(async (server) => {
  // https://gist.github.com/ShogunPanda/fe98fd23d77cdfb918010dbc42f4504d
  const importDynamic = new Function("modulePath", "return import(modulePath)");
  server.register(await importDynamic("fastify-print-routes"));
});
