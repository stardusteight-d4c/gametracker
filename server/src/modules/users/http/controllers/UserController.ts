import { FastifyReply, FastifyRequest } from "fastify"
import { Body, Controller, Get, Post, Query, Req, Res } from "@nestjs/common"

import {
  SignUp,
  SignIn,
  List,
  RefreshToken,
} from "@modules/users/app/use-cases"

import { JWTSessionTokenAdapter } from "@shared/adapters/JWTSessionTokenAdapter"
import { BcryptCryptoAdapter } from "@shared/adapters/BcryptCryptoAdapter"

@Controller("users")
export class UserController {
  @Post("auth/signUp")
  public async signUp(@Body() body: SignUpDTO, @Res() reply: FastifyReply) {
    return new SignUp({
      user: body,
      cryptoAdapter: new BcryptCryptoAdapter(),
      sessionTokenAdapter: new JWTSessionTokenAdapter(),
      response: reply,
    })
      .execute()
      .then((res) => res)
  }

  @Post("auth/signIn")
  public async signIn(@Body() body: SignInDTO, @Res() reply: FastifyReply) {
    return new SignIn({
      credencials: body,
      cryptoAdapter: new BcryptCryptoAdapter(),
      sessionTokenAdapter: new JWTSessionTokenAdapter(),
      response: reply,
    })
      .execute()
      .then((res) => res)
  }

  @Get("auth/refreshToken")
  public async refreshToken(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply
  ) {
    return new RefreshToken({
      request: req,
      response: reply,
      sessionTokenAdapter: new JWTSessionTokenAdapter(),
    })
      .execute()
      .then((res) => res)
  }

  @Get("list")
  public async list(@Query() query: UserListDTO, @Res() reply: FastifyReply) {
    return new List({ params: query, response: reply })
      .execute()
      .then((res) => res)
  }
}
