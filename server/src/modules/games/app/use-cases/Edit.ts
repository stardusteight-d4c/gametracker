import { FastifyReply } from "fastify"

import { GameRepository } from "@modules/games/app/decorators/GameRepository"

@GameRepository
export class Edit {
  repository: IGameRepository
  game: IGame
  userId: string
  response: FastifyReply

  public constructor(attr: {
    game: IGame
    userId: string
    response: FastifyReply
  }) {
    this.game = attr.game
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

    await this.repository.update({ game: this.game, userId: this.userId })

    return this.response.status(200).send({
      message: "Game updated successfully",
      error: null,
      statusCode: 200,
      data: null,
    })
  }
}
