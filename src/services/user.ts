import { prisma } from "../prisma"

const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id: id } })
}

export { getUserById }
