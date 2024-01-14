interface ISessionTokenAdapter {
  createAccessToken(data: Partial<IUser>): string
  createRefreshToken(data: Partial<IUser>): string
  decodeAccessToken(token: string): UserTokenDTO | false
  decodeRefreshToken(token: string): UserTokenDTO | false
}
