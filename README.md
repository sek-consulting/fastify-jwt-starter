# Fastify x Typeorm x JWT

![CodeQL](https://github.com/sek-consulting/fastify-api-skeleton/workflows/CodeQL/badge.svg)

A skeleton project to kickstart your coding.

- Autoloading for routes & plugins
- JWT Authentication
- Typeorm
- A Rate Limiter for all routes
- CORS

# Built-in extras

- jwt payload accessible via _`server.jwt.payload`_ (see: [/routes/users/index.ts](https://github.com/sek-consulting/fastify-api-skeleton/blob/main/src/routes/users/index.ts))
- [/lib/db.ts](/lib/db.ts) exports _`rawQuery(query: string, parameters?: any[])`_ for a more intuitive access

# Reporting issues

- Any new issues please report in [GitHub site](https://github.com/sek-consulting/fastify-api-skeleton/issues)
