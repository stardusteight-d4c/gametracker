import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"
import { setCookieHttpOnly } from "@shared/utils"

@UserRepository
export class SignUp {
  repository: IUserRepository
  sessionTokenAdapter: ISessionTokenAdapter
  cryptoAdapter: ICryptoAdapter
  user: SignUpDTO
  response: FastifyReply

  constructor(attr: {
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

    const emailAlreadyExists = await this.repository.findByEmail(this.user.email)
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
    setCookieHttpOnly(this.response, refreshToken)

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
