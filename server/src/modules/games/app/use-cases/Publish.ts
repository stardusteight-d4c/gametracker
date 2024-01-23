import { FastifyReply } from "fastify"

import { GameRepository } from "@modules/games/app/decorators/GameRepository"

@GameRepository
export class Publish {
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
        message: "Invalid token or there is no session",
        error: "Unauthorized",
        statusCode: 401,
        data: null,
      })
    }

    await this.repository.save({ ...this.game, userId: this.userId })

    return this.response.status(201).send({
      message: "Game published successfully",
      error: null,
      statusCode: 201,
      data: null,
    })
  }
}
