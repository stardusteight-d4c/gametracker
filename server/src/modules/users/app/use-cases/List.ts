import { FastifyReply } from "fastify"

import { UserRepository } from "@modules/users/app/decorators/UserRepository"

@UserRepository
export class List {
  repository: IUserRepository
  params: UserListDTO
  response: FastifyReply

  public constructor(attr: { params: UserListDTO; response: FastifyReply }) {
    this.params = attr.params
    this.response = attr.response
  }

  public async execute() {
    const items = await this.repository.list({
      ...this.params,
      currentPage: this.params.currentPage
        ? Number(this.params.currentPage)
        : undefined,
      pageSize: this.params.pageSize ? Number(this.params.pageSize) : undefined,
    })

    return this.response.status(200).send({
      message: "Users listed successfully",
      error: null,
      statusCode: 200,
      data: items,
    })
  }
}
