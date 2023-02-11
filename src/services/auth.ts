import { User } from ".prisma/client";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import { LoginData } from "../entities/login-data";

const login = async ({ email, password }: LoginData): Promise<User | false> => {
  const user = await prisma.user.findFirst({ where: { email: email } });
  if (user && verify(password, user.password)) {
    return user;
  }
  return false;
};

const hash = (plainText: string): string => {
  return bcrypt.hashSync(plainText, 10);
};

const verify = (plainText: string, hashText: string): boolean => {
  return bcrypt.compareSync(plainText, hashText);
};

export { login, hash, verify };
