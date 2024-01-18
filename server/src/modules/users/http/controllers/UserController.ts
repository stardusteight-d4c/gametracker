import { FastifyReply } from "fastify"
import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common"

import { SignUp, SignIn } from "@modules/users/app/use-cases"

import { JWTSessionTokenAdapter } from "@shared/adapters/JWTSessionTokenAdapter"
import { BcryptCryptoAdapter } from "@shared/adapters/BcryptCryptoAdapter"
import { List } from "../../app/use-cases/List"

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

  @Get("list")
  public async list(@Query() query: UserListDTO, @Res() reply: FastifyReply) {
    return new List({ params: query, reponse: reply })
      .execute()
      .then((res) => reply.status(201).send(res))
      .catch((err) => reply.status(501).send(err))
  }
}
