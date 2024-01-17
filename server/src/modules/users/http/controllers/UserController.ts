import { FastifyReply, FastifyRequest } from "fastify"
import { Body, Controller, Post, Req, Res } from "@nestjs/common"

import { SignUp, SignIn } from "@modules/users/app/use-cases"

import { JWTSessionTokenAdapter } from "@shared/adapters/JWTSessionTokenAdapter"
import { BcryptCryptoAdapter } from "@shared/adapters/BcryptCryptoAdapter"

@Controller("users")
// @UseGuards(RequireUserPermission)
export class UserController {
  @Post("signUp")
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

  @Post("signIn")
  public async signIn(@Body() body: SignInDTO, @Res() reply: FastifyReply) {
    return new SignIn({
      credencials: body,
      cryptoAdapter: new BcryptCryptoAdapter(),
      sessionTokenAdapter: new JWTSessionTokenAdapter(),
      response: reply,
    })
      .execute()
      .then((res) => reply.status(201).send(res))
      .catch((err) => reply.status(501).send(err))
  }
}
