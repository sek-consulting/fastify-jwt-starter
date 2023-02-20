import rateLimit, { FastifyRateLimitOptions } from "@fastify/rate-limit";
import fp from "fastify-plugin";

/**
 * This plugin adds a rate limiter to your routes
 *
 * @see https://github.com/fastify/fastify-rate-limit
 */
export default fp<FastifyRateLimitOptions>(async (server) => {
  server.register(rateLimit, {
    // currently set to 100 requests per minute, change depending on your needs
    max: 100,
    timeWindow: "1 minute"
  });

  // setting a custom error message, delete if you don't need it
  server.setErrorHandler((error, _, reply) => {
    if (reply.statusCode === 429) {
      error.message = "You hit the rate limit! Slow down please!";
    }
    return reply.send(error);
  });
});
