import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TodoModule } from './todo/todo.module';
import { TitleModule } from './title/title.module';

@Module({
  imports: [UsersModule, AuthModule, TodoModule, TitleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
