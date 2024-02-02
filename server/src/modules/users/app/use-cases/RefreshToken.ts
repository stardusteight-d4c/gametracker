import { FastifyReply, FastifyRequest } from "fastify"
import { UserRepository } from "../decorators/UserRepository"
import { setCookie } from "@shared/utils"

@UserRepository
export class RefreshToken {
  repository: IUserRepository
  sessionTokenAdapter: ISessionTokenAdapter
  refreshToken: string
  userInfo: UserTokenDTO
  request: FastifyRequest
  response: FastifyReply

  constructor(attr: {
    sessionTokenAdapter: ISessionTokenAdapter
    request: FastifyRequest
    response: FastifyReply
  }) {
    this.sessionTokenAdapter = attr.sessionTokenAdapter
    this.request = attr.request
    this.refreshToken = this.request.cookies.refreshToken
    this.response = attr.response
  }

  public async execute() {
    return await this.generateResponse()
  }

  private async getAccessToken() {
    const user = await this.repository.findById(this.userInfo.id)
    return this.sessionTokenAdapter.createAccessToken(user)
  }

  private getUserInfo() {
    return this.sessionTokenAdapter.decodeRefreshToken(this.refreshToken)
  }

  private async generateResponse() {
    const refreshDecoded = this.getUserInfo()
    const thirtyMinutes = 30 * 60 * 1000

    if (refreshDecoded) {
      this.userInfo = refreshDecoded
    } else {
      return this.response.status(401).send({
        message: "Refresh Token is invalid",
        error: "Unauthorized",
        statusCode: 401,
        data: null,
      })
    }

    const newAccessToken = await this.getAccessToken()

    setCookie({
      name: "accessToken",
      value: newAccessToken,
      age: thirtyMinutes,
      response: this.response,
      httpOnly: false,
    })

    return this.response.status(200).send({
      message: "Refresh successfully",
      error: null,
      statusCode: 200,
      data: {
        accessToken: newAccessToken,
      },
    })
  }
}
