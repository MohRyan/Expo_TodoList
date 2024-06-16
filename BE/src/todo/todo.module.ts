import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/auth/constants";
import { PrismaModule } from "src/prisma/prisma.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "2d" },
    }),
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: "uploads",
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = file.originalname.split(".").pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService, PrismaService, JwtService],
  exports: [TodoService],
})
export class TodoModule {}
