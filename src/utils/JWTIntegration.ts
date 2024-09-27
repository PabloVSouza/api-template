import * as jwt from 'jose'
import 'dotenv/config'

type payload = { [key: string]: any }

export const generateToken = async (payload: payload) => {
  const secret = new TextEncoder().encode(String(process.env.JWT_SECRET))
  const token = await new jwt.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    // .setExpirationTime('30 seconds')
    .sign(secret)
  return token
}

export const validateToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '')
  const tokenString = token.split(' ')[1]
  const { payload } = await jwt.jwtVerify(tokenString, secret)

  return payload
}
