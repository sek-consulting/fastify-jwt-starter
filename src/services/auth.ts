import { randomUUID } from "crypto";

import { User } from ".prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { RefreshTokenPayload } from "../entities/jwt-payloads";
import { prisma } from "../prisma";

/* ************************
        PASSWORD
************************ */

const login = async (
  email: string,
  password: string
): Promise<User | false> => {
  const user = await prisma.user.findFirst({ where: { email: email } });
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return false;
};

const hash = (plainText: string): string => {
  return bcrypt.hashSync(plainText, 10);
};

/* ************************
          JWT
************************ */

const key =
  process.env.JWT_SECRET || "super-secret-password-that-nobody-should-know";

const verifyToken = (token: string) => {
  // throws error on fail
  return jwt.verify(token, key);
};

const createAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, key, { expiresIn: process.env.ACCESS_EXP });
};

const createRefreshToken = async (userId: number) => {
  // deactivate all previous tokens
  await prisma.refreshToken.updateMany({
    data: { active: false },
    where: { userId: userId }
  });
  // register token as active in the database
  const uuid = randomUUID();
  await prisma.refreshToken.create({
    data: { token: uuid, userId: userId }
  });
  // sign new token
  return jwt.sign({ id: userId, uuid: uuid }, key, {
    expiresIn: process.env.REFRESH_EXP
  });
};

const createTokens = async (userId: number) => ({
  accessToken: createAccessToken(userId),
  refreshToken: await createRefreshToken(userId)
});

const refreshTokens = async (token: string) => {
  // check refresh-token validity
  const payload = verifyToken(token) as RefreshTokenPayload;
  const found = await prisma.refreshToken.findFirst({
    where: { token: payload.uuid, active: true }
  });
  if (!found) {
    throw new jwt.JsonWebTokenError("invalid token");
  }
  // create new tokens
  return createTokens(payload.id);
};

/* ************************
          EXPORT
************************ */

export { login, hash, verifyToken, createTokens, refreshTokens };
