import { Module } from "@nestjs/common"
import { UserController } from "./http/controllers/UserController"

@Module({
  controllers: [UserController],
})
export class UsersModule {}
