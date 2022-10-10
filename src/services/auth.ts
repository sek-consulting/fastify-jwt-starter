import * as bcrypt from "bcrypt";

import { LoginData } from "../entities/login-data";
import { User } from "../entities/user";
import { db } from "../lib/db";

const login = async ({ email, password }: LoginData): Promise<User | false> => {
  const user = await db.getRepository(User).findOneBy({ email: email });
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
