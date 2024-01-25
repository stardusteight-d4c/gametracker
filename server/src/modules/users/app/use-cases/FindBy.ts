import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"

@UserRepository
export class FindBy {
  repository: IUserRepository
  params: FindByDTO
  response: FastifyReply

  public constructor(attr: { params: FindByDTO; response: FastifyReply }) {
    this.params = attr.params
    this.response = attr.response
  }

  public async execute() {
    let user: IUser

    if (this.params.userId) {
      user = await this.repository.findById(this.params.userId)
      user && delete user.password
    }

    if (this.params.username) {
      user = await this.repository.findByUsername(this.params.username)
      user && delete user.password
    }

    if (!user) {
      return this.response.status(400).send({
        message: "User not find",
        error: "Bad Request",
        statusCode: 400,
        data: null,
      })
    }

    return this.response.status(200).send({
      message: "Get user successfully",
      error: null,
      statusCode: 200,
      data: user,
    })
  }
}
