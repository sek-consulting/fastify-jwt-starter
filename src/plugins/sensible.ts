import sensible, { SensibleOptions } from "@fastify/sensible"
import fp from "fastify-plugin"

/**
 * This plugin adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<SensibleOptions>(async (server) => {
  server.register(sensible)
})
