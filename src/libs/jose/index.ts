import * as jose from 'jose'
import { UserSchema } from '../mongoose'
import { zodEnvs } from '../zod/env'

export type TokenData = Pick<UserSchema, '_id' | 'email' | 'role'>

export const decodeToken = async (token: string) => {
  return jose
    .jwtVerify(token, new TextEncoder().encode(zodEnvs.JWT_SECRET))
    .then((res) => res.payload as TokenData)
    .catch(() => null)
}

export const createToken = async (data: TokenData) => {
  return new jose.SignJWT(data).setProtectedHeader({ alg: 'HS256' }).sign(new TextEncoder().encode(zodEnvs.JWT_SECRET))
}
