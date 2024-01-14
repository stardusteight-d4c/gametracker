import jwt from "jsonwebtoken"

import { tokenPayloadTransformer } from "../transformers/TokenPayloadTransformer"

export class JWTSessionTokenAdapter implements ISessionTokenAdapter {
  constructor() {}

  public createAccessToken(payload: IUser): string {
    const tokenInfo = tokenPayloadTransformer(payload)
    const accessToken = jwt.sign(tokenInfo, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "30m",
    })
    return accessToken
  }

  public createRefreshToken(payload: IUser): string {
    const tokenInfo = tokenPayloadTransformer(payload)
    const refreshToken = jwt.sign(
      tokenInfo,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: "30d",
      }
    )
    return refreshToken
  }

  public decodeAccessToken(token: string): UserTokenDTO | false {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
      if (decoded) {
        return decoded as UserTokenDTO
      }
    } catch (error) {
      return false
    }
  }

  public decodeRefreshToken(token: string): UserTokenDTO | false {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!)
      if (decoded) {
        return decoded as UserTokenDTO
      }
    } catch (error) {
      return false
    }
  }
}
