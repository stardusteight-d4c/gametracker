import { FastifyRequest } from "fastify"

import { JWTSessionTokenAdapter } from "@shared/adapters/JWTSessionTokenAdapter"

export function getUserSession(req: FastifyRequest) {
  const accessToken = req.cookies.accessToken
  if (accessToken) {
    const decoded = new JWTSessionTokenAdapter().decodeAccessToken(accessToken)
    return decoded ? decoded : undefined
  } else {
    return undefined
  }
}
