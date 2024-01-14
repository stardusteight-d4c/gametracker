import { setCookieHttpOnly } from "@shared/utils"
import { FastifyReply } from "fastify"

// Inserir repository via decorator
export class SignUp {
  repository: IUserRepository
  sessionTokenAdapter: ISessionTokenAdapter
  cryptoAdapter: ICryptoAdapter
  user: IUser
  response: FastifyReply

  constructor(attr: {
    sessionTokenAdapter: ISessionTokenAdapter
    cryptoAdapter: ICryptoAdapter
    user: IUser
    response: FastifyReply
  }) {
    this.sessionTokenAdapter = attr.sessionTokenAdapter
    this.cryptoAdapter = attr.cryptoAdapter
    this.user = attr.user
    this.response = attr.response
  }

  public async execute() {
    return this.repository
      .save({
        ...this.user,
        password: await this.encryptPassword(),
      })
      .then((user) => {
        this.user = user
        return this.generateResponse()
      })
  }

  private async encryptPassword() {
    return await this.cryptoAdapter.encrypt(this.user.password)
  }

  private getAccessToken() {
    return this.sessionTokenAdapter.createAccessToken(this.user)
  }

  private getRefreshToken() {
    return this.sessionTokenAdapter.createRefreshToken(this.user)
  }

  private generateResponse() {
    const accessToken = this.getAccessToken()
    const refreshToken = this.getRefreshToken()
    setCookieHttpOnly(this.response, refreshToken)

    return this.response.status(200).send({
      message: "Registered successfully",
      error: null,
      statusCode: 201,
      data: {
        accessToken,
        refreshToken,
      },
    })
  }
}
