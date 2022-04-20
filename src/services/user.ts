import { User } from "../entities/user";
import { db } from "../lib/db";

const getUserById = async (id: number): Promise<User | null> => {
  return await db.getRepository(User).findOneBy({ id: id });
};

export { getUserById };
