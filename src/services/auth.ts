import { randomUUID } from "crypto"

import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

import { RefreshTokenPayload } from "../entities/jwt-payloads"
import { prisma } from "../prisma"

/* ************************
        PASSWORD
************************ */

/**
 * tries to find a user with the given credentials
 */
const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email: email } })
  if (user && bcrypt.compareSync(password, user.password)) {
    return user
  }
  return false
}

/**
 * used to hash the given plain text
 */
const hash = (plainText: string) => bcrypt.hashSync(plainText, 10)

/* ************************
          JWT
************************ */

const key = process.env.JWT_SECRET

/**
 * used to verify the passed in token
 */
const verifyToken = (token: string) => jwt.verify(token, key)

/**
 * used to create a new set of takens used for authentication
 */
const createTokens = async (userId: number) => {
  // deactivate all previous refresh tokens
  await prisma.refreshToken.updateMany({
    data: { active: false },
    where: { userId: userId }
  })
  // register new refresh token as active
  const uuid = randomUUID()
  await prisma.refreshToken.create({
    data: { token: uuid, userId: userId }
  })
  // sign refresh token
  const refreshToken = jwt.sign({ id: userId, uuid: uuid }, key, {
    expiresIn: process.env.REFRESH_EXP
  })
  const accessToken = jwt.sign({ id: userId }, key, {
    expiresIn: process.env.ACCESS_EXP
  })
  return { refreshToken: refreshToken, accessToken: accessToken }
}

/**
 * used to check the token for validity and refresh the tokens if needed
 */
const refreshTokens = async (token: string) => {
  // check refresh-token validity
  const payload = verifyToken(token) as RefreshTokenPayload
  const found = await prisma.refreshToken.findFirst({
    where: { token: payload.uuid, active: true }
  })
  if (!found) {
    throw new jwt.JsonWebTokenError("invalid token")
  }
  // create new tokens
  return createTokens(payload.id)
}

/* ************************
          EXPORT
************************ */

export { login, hash, verifyToken, createTokens, refreshTokens }
