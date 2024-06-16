import { Module } from "@nestjs/common";
import { TitleService } from "./title.service";
import { TitleController } from "./title.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [TitleController],
  providers: [TitleService, PrismaService, JwtService],
})
export class TitleModule {}
