import { Module } from "@nestjs/common"
import { GameController } from "./http/controllers/GameController"

@Module({
  controllers: [GameController],
})
export class GamesModule {}
