import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { UsersModule } from "./modules/users/UsersModule"
import { GamesModule } from "./modules/games/GamesModule"

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, GamesModule],
})
export class AppModule {}
