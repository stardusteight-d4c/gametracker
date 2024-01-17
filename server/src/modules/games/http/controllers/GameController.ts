import { FastifyReply, FastifyRequest } from "fastify"
import { Body, Controller, Post, Req, Res } from "@nestjs/common"

import { Publish } from "@modules/games/app/use-cases"
import { getUserSession } from "@shared/utils/getUserSession"

@Controller("games")
// @UseGuards(RequireUserPermission)
export class GameController {
  @Post("publish")
  public async publish(
    @Body() body: IGame,
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    console.log(getUserSession(req));
    
    return new Publish({
      game: body,
      userId: getUserSession(req)?.id,
      response: reply,
    })
      .execute()
      .then((res) => reply.status(201).send(res))
      .catch((err) => reply.status(501).send(err))
  }
}
