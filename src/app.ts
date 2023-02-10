import "reflect-metadata";

import { join } from "path";

import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { FastifyPluginAsync } from "fastify";

export type AppOptions = {
  // Here is your place for custom options!
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (server, opts) => {
  server.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  server.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
    routeParams: true,
  });
};

export default app;
export { app };
