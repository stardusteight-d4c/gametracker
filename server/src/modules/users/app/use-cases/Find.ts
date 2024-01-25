import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"

@UserRepository
export class Find {
  repository: IUserRepository
  userId: string
  response: FastifyReply

  public constructor(attr: {
    userId: string
    response: FastifyReply
  }) {
    this.userId = attr.userId
    this.response = attr.response
  }

  public async execute() {
    const user = await this.repository.find(this.userId)
    delete user.password

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
