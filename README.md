# ATTENTION!

Starting August 2nd 2023 this repository will be archived.

# Fastify x Prisma x JWT

![CodeQL](https://github.com/sek-consulting/fastify-api-skeleton/workflows/CodeQL/badge.svg)

**The easiest way to create your own API.**

## What are the main features?

- Autoloading for routes & plugins
- [JWT](https://github.com/auth0/node-jsonwebtoken) Authentication with both access & refresh tokens
- [Prisma](https://github.com/prisma/prisma) for easy db management / creation

## Plugins

- [@fastify/autoload](https://github.com/fastify/fastify-autoload)
- [@fastify/cors](https://github.com/fastify/fastify-cors)
- [@fastify/rate-limit](https://github.com/fastify/fastify-rate-limit)
- [@fastify/sensible](https://github.com/fastify/fastify-sensible)

Unneeded plugins can be removed by deleting the corresponding file from the plugins folder and removing the dependency in the package.json.

## Built-in extras

- accessToken payload accessible via _`server.jwtPayload`_

## Installation

**1.** clone the github repo

```bash
git clone https://github.com/sek-consulting/fastify-api-skeleton.git your/directory/
```

**2.** change the provider of the datasource in the `schema.prisma` if needed and set the `DATABASE_URL` in your .env file

```
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

**3.** use `db.push` to synchronize your schema with the database

## How to?

Let's say you want to create some kind of content management system with posts.
Here is how you would do that.

### 1. Setting up the database model inside `schema.prisma`

```js
// data model
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields:  [authorId], references: [id])
  authorId  Int?

  @@map("posts")
}

// add reference to user
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String
  password String

  refreshTokens RefreshToken[]
  posts         Post[] // <-- here

  @@map("users")
}
```

For more information click [here](https://github.com/prisma/prisma).

### 2. Setting up the services for data access

create the needed file in the services folder (services/post.ts):

```js
import { prisma } from "../prisma"

const getPostById = async (id: number) => {
  return await prisma.post.findUnique({ where: { id: id } })
}

export { getPostById }
```

### 3. Setting up routes

create the needed file(s) in your routes folder (routes/posts/index.ts):

```js
import { FastifyPluginAsync, FastifyRequest } from "fastify"

import { getPostById } from "../../services/post"

const posts: FastifyPluginAsync = async (server) => {
  server.addHook("onRequest", server.authenticate) // this makes all routes below only visible if you're logged-in

  server.get("/:id", async (request: FastifyRequest<{ Params: { id: number } }>, reply) => {
    const id = request.params.id
    const post = await getPostById(id)
    if (post) {
      return reply.status(200).send({ post })
    }
    return reply.notFound()
  })
}

export default posts
```

**Congratulations! You're done.**

## Roadmap

- [ ] **more to come**

## Reporting issues

Any new issues please report in [GitHub site](https://github.com/sek-consulting/fastify-api-skeleton/issues)
