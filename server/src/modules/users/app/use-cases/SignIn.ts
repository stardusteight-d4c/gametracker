import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"
import { setCookieHttpOnly } from "@shared/utils"

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

  constructor(attr: {
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
    this.credencials = {
      type: attr.credencials.type,
      access: attr.credencials.access,
      password: attr.credencials.password,
    }
  }

  public async execute() {
    console.log('this.credencials', this.credencials);
    
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
    setCookieHttpOnly(this.response, refreshToken)
    return {
      message: "Authenticated successfully",
      error: null,
      statusCode: 200,
      data: {
        accessToken,
        refreshToken,
      },
    }
  }
}
