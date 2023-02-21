import { PrismaClient } from "@prisma/client"
export const prisma = new PrismaClient({
  // here you can disable the logging channels you don't need
  log: ["query", "info", "warn", "error"]
})
