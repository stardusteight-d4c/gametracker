import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"
import { setCookie } from "@shared/utils"

@UserRepository
export class SignUp {
  repository: IUserRepository
  sessionTokenAdapter: ISessionTokenAdapter
  cryptoAdapter: ICryptoAdapter
  user: SignUpDTO
  response: FastifyReply

  public constructor(attr: {
    sessionTokenAdapter: ISessionTokenAdapter
    cryptoAdapter: ICryptoAdapter
    user: SignUpDTO
    response: FastifyReply
  }) {
    this.sessionTokenAdapter = attr.sessionTokenAdapter
    this.cryptoAdapter = attr.cryptoAdapter
    this.user = attr.user
    this.response = attr.response
  }

  public async execute() {
    const usernameAlreadyExists = await this.repository.findByUsername(
      this.user.username
    )
    if (usernameAlreadyExists)
      return this.response.status(400).send({
        message: "Username already exists",
        error: "Bad Request",
        statusCode: 400,
        data: null,
      })

    const emailAlreadyExists = await this.repository.findByEmail(
      this.user.email
    )
    if (emailAlreadyExists)
      return this.response.status(400).send({
        message: "Email already exists",
        error: "Bad Request",
        statusCode: 400,
        data: null,
      })

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

    return this.response.status(201).send({
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
