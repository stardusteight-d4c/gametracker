import { FastifyReply, FastifyRequest } from "fastify"
import { Body, Controller, Post, Req, Res } from "@nestjs/common"

import { SignUp } from "@modules/users/app/use-cases/SignUp"

import { JWTSessionTokenAdapter } from "@shared/adapters/JWTSessionTokenAdapter"
import { BcryptCryptoAdapter } from "@shared/adapters/BcryptCryptoAdapter"

@Controller("users")
// @UseGuards(RequireUserPermission)
export class UserController {
  @Post("signup")
  public async signUp(@Body() body: SignUpDTO, @Res() reply: FastifyReply) {
    return new SignUp({
      user: body,
      cryptoAdapter: new BcryptCryptoAdapter(),
      sessionTokenAdapter: new JWTSessionTokenAdapter(),
      response: reply,
    })
      .execute()
      .then((res) => reply.status(201).send(res))
      .catch((err) => reply.status(501).send(err))
  }
}
