import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { JwtService } from "@nestjs/jwt";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("all")
  findAll() {
    return this.usersService.findAll();
  }

  @Get("byToken")
  findOne(@Request() req) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token not provided");
    }

    try {
      const decoded = this.jwtService.decode(token) as any;
      const userId = decoded.id;

      return this.usersService.findOne(userId);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
