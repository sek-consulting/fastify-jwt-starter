import rateLimit, { FastifyRateLimitOptions } from "@fastify/rate-limit";
import fp from "fastify-plugin";

/**
 * This plugin adds a rate limiter to your routes
 *
 * @see https://github.com/fastify/fastify-rate-limit
 */
export default fp<FastifyRateLimitOptions>(async (server) => {
  server.register(rateLimit, {
    max: 10,
    timeWindow: "1 minute"
  });

  // setting a custom error message
  server.setErrorHandler((error, _, reply) => {
    if (reply.statusCode === 429) {
      error.message = "You hit the rate limit! Slow down please!";
    }
    return reply.send(error);
  });
});
