import "reflect-metadata";

import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import { FastifyPluginAsync } from "fastify";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  server,
  opts
): Promise<void> => {
  // Place here your custom code!

  void server.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  void server.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
    routeParams: true,
  });
};

export default app;
export { app };
