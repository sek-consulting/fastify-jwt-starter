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
- [fastify-print-routes](https://github.com/ShogunPanda/fastify-print-routes)

If you don't need some of the plugins for your own project just remove the respective file from the plugins folder and the package.json.

## Built-in extras

- accessToken payload accessible via _`server.jwtPayload`_

## Setup

### 1. Installation

```bash
git clone https://github.com/sek-consulting/fastify-api-skeleton.git your/directory/
```

### 2. Setting up routes

fastify-autoload in combination with `routeParams:true` let's you do stuff like this and use parameters directly in the folder names (users/\_id):

```js
├── routes
├── auth
│    └── index.ts
├── users
│    ├── _id
│    │   └── index.ts
│    └── index.ts
├── posts
│    └── index.ts
└── index.ts
```

For more information click [here](https://github.com/fastify/fastify-autoload).

### 3. Setting up the database

Add or change all the models you need for api in `schema.prisma`, like adding a "Post" model:

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

### 4. Starting the server

- development: `npm run dev`
- production: `npm run build` & `npm run start`

## Roadmap

- [ ] **more to come**

## Reporting issues

- Any new issues please report in [GitHub site](https://github.com/sek-consulting/fastify-api-skeleton/issues)
