import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"

@UserRepository
export class List {
  repository: IUserRepository
  params: UserListDTO
  response: FastifyReply

  public constructor(attr: { params: UserListDTO; reponse: FastifyReply }) {
    this.params = attr.params
    this.response = attr.reponse
  }

  public async execute() {
    const items = await this.repository.list({
      ...this.params,
      currentPage: Number(this.params.currentPage),
      pageSize: Number(this.params.pageSize),
    })

    return this.response.status(200).send({
      message: "Users listed successfully",
      error: null,
      statusCode: 200,
      data: items,
    })
  }
}
