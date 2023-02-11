# Fastify x Prisma x JWT

![CodeQL](https://github.com/sek-consulting/fastify-api-skeleton/workflows/CodeQL/badge.svg)

A skeleton project to kickstart your coding.

- Autoloading for routes & plugins
- JWT Authentication
- Prisma
- A Rate Limiter for all routes
- CORS

## Built-in extras

- jwt payload accessible via _`server.jwt.payload`_ (see: [/routes/users/index.ts](https://github.com/sek-consulting/fastify-api-skeleton/blob/main/src/routes/users/index.ts))

## Roadmap

- [ ] adding a refreshtoken (shortlived accesstoken, longlived refreshtoken)
- [ ] polish the readme and add a "how to start" section
- [ ] re-evaluate eslint/prettier settings and update plugins (especially the import order)
- [ ] more to come

## Reporting issues

- Any new issues please report in [GitHub site](https://github.com/sek-consulting/fastify-api-skeleton/issues)
