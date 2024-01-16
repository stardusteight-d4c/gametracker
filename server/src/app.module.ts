import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./modules/users/UserModule"

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
})
export class AppModule {}
