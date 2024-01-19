import { FastifyReply } from "fastify"

import { GameRepository } from "@modules/games/app/decorators/GameRepository"

@GameRepository
export class Delete {
  repository: IGameRepository
  gameId: string
  userId: string
  response: FastifyReply

  public constructor(attr: {
    gameId: string
    userId: string
    response: FastifyReply
  }) {
    this.gameId = attr.gameId
    this.userId = attr.userId
    this.response = attr.response
  }

  public async execute() {
    if (!this.userId) {
      return this.response.status(401).send({
        message: "There is no session",
        error: "Unauthorized",
        statusCode: 401,
        data: null,
      })
    }

    await this.repository.delete({ gameId: this.gameId, userId: this.userId })

    return this.response.status(200).send({
      message: "Game deleted successfully",
      error: null,
      statusCode: 200,
      data: null,
    })
  }
}
