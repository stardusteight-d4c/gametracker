import dotenv from "dotenv"

import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface"

dotenv.config()

const origin = process.env.ORIGIN

export const corsOptions: CorsOptions = {
  origin: origin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  exposedHeaders: ["Set-Cookie"],
  allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
}
