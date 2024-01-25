import { FastifyReply } from "fastify"

import { GameRepository } from "@modules/games/app/decorators/GameRepository"

@GameRepository
export class List {
  repository: IGameRepository
  sessionUserId: string
  params: GameListDTO
  response: FastifyReply

  public constructor(attr: {
    params: GameListDTO
    sessionUserId: string
    response: FastifyReply
  }) {
    this.params = attr.params
    this.sessionUserId = attr.sessionUserId
    this.response = attr.response
  }

  public async execute() {
    if (this.params.sessionOwner && Boolean(this.params.sessionOwner)) {
      if (!this.sessionUserId) {
        return this.response.status(401).send({
          message: "There is no session",
          error: "Unauthorized",
          statusCode: 401,
          data: null,
        })
      }

      if (this.sessionUserId !== this.params.userId) {
        return this.response.status(401).send({
          message: "User session id does not match with games owner",
          error: "Unauthorized",
          statusCode: 401,
          data: null,
        })
      }

      const items = await this.repository.list({
        ...this.params,
        currentPage: this.params.currentPage
          ? Number(this.params.currentPage)
          : undefined,
        pageSize: this.params.pageSize
          ? Number(this.params.pageSize)
          : undefined,
      })

      return this.response.status(200).send({
        message: "Games listed successfully",
        error: null,
        statusCode: 200,
        data: items,
      })
    }

    const items = await this.repository.list({
      ...this.params,
      currentPage: this.params.currentPage
        ? Number(this.params.currentPage)
        : undefined,
      pageSize: this.params.pageSize ? Number(this.params.pageSize) : undefined,
    })

    return this.response.status(200).send({
      message: "Games listed successfully",
      error: null,
      statusCode: 200,
      data: items,
    })
  }
}
