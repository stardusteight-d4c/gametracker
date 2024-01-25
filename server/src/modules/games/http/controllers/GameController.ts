import { FastifyReply, FastifyRequest } from "fastify"
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from "@nestjs/common"

import {
  Publish,
  Delete as DeleteGame,
  Edit,
  List,
} from "@modules/games/app/use-cases"
import { getUserSession } from "@shared/utils/getUserSession"

@Controller("games")
export class GameController {
  @Post("publish")
  public async publish(
    @Body() body: IGame,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    return new Publish({
      game: body,
      userId: getUserSession(req)?.id,
      response: reply,
    })
      .execute()
      .then((res) => res)
  }

  @Get("list")
  public async list(
    @Query() query: GameListDTO,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    return new List({
      params: query,
      sessionUserId: getUserSession(req)?.id,
      response: reply,
    })
      .execute()
      .then((res) => res)
  }

  @Delete("delete/:gameId")
  public async delete(
    @Param("gameId") gameId: string,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    return new DeleteGame({
      gameId,
      userId: getUserSession(req)?.id,
      response: reply,
    })
      .execute()
      .then((res) => res)
  }

  @Put("edit")
  public async update(
    @Body() body: IGame,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    return new Edit({
      game: body,
      userId: getUserSession(req)?.id,
      response: reply,
    })
      .execute()
      .then((res) => res)
  }
}
