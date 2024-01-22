import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"
import { setCookie } from "@shared/utils"

@UserRepository
export class SignIn {
  repository: IUserRepository
  sessionTokenAdapter: ISessionTokenAdapter
  cryptoAdapter: ICryptoAdapter
  user: IUser
  response: FastifyReply
  credencials: {
    type: "username" | "email"
    access: string
    password: string
  }

  public constructor(attr: {
    sessionTokenAdapter: ISessionTokenAdapter
    cryptoAdapter: ICryptoAdapter
    response: FastifyReply
    credencials: {
      type: "username" | "email"
      access: string
      password: string
    }
  }) {
    this.sessionTokenAdapter = attr.sessionTokenAdapter
    this.cryptoAdapter = attr.cryptoAdapter
    this.response = attr.response
    this.credencials = attr.credencials
  }

  public async execute() {
    if (this.credencials.type === "email") {
      const user = await this.repository.findByEmail(this.credencials.access)
      if (!user) {
        return this.response.status(400).send({
          message: "Invalid password or username",
          error: "Bad Request",
          statusCode: 400,
          data: null,
        })
      }
      this.user = user
    }

    if (this.credencials.type === "username") {
      const user = await this.repository.findByUsername(this.credencials.access)
      if (!user) {
        return this.response.status(400).send({
          message: "Invalid password or username",
          error: "Bad Request",
          statusCode: 400,
          data: null,
        })
      }
      this.user = user
    }

    const isValidPassword = await this.comparePassword()
    if (!isValidPassword)
      return this.response.status(400).send({
        message: "Invalid password or username",
        error: "Bad Request",
        statusCode: 400,
        data: null,
      })

    return this.generateResponse()
  }

  private async comparePassword() {
    return this.user?.password
      ? await this.cryptoAdapter.decrypt({
          text: this.credencials.password,
          hashedText: this.user.password,
        })
      : false
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
    const thirtyDays = 30 * 24 * 60 * 60 * 1000
    const thirtyMinutes = 30 * 60 * 1000

    setCookie({
      name: "accessToken",
      value: accessToken,
      age: thirtyMinutes,
      response: this.response,
      httpOnly: false,
    })
    setCookie({
      name: "refreshToken",
      value: refreshToken,
      age: thirtyDays,
      response: this.response,
      httpOnly: true,
    })

    return this.response.status(200).send({
      message: "Authenticated successfully",
      error: null,
      statusCode: 200,
      data: null,
    })
  }
}
