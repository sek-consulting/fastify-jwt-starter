import { User } from ".prisma/client";
import { prisma } from "../prisma";

const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id: id } });
};

export { getUserById };
