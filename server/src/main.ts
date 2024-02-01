import { NestFactory } from "@nestjs/core"
import fastifyCookie, { FastifyCookieOptions } from "@fastify/cookie"

import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify"

import { AppModule } from "./app.module"
import { corsOptions } from "@config/cors/corsOptions"

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.enableCors(corsOptions)

  app.register(fastifyCookie, {
    secret: process.env.FASTIFY_COOKIE_SECRET,
    parseOptions: {},
  } as FastifyCookieOptions)

  app.listen(process.env.PORT, "0.0.0.0").then(() => {
    console.log("🚀 Server running on port:", process.env.PORT)
  })
}
bootstrap()
