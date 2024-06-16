import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFiles,
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { TodoService } from "./todo.service";
import { JwtService } from "@nestjs/jwt";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("todo")
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(":id")
  create(@Body() createTodoDto: CreateTodoDto, @Param("id") id: string) {
    try {
      return this.todoService.create(createTodoDto, id);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  @Get(":id")
  findAll(@Param("id") id: string) {
    return this.todoService.findAll(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.todoService.remove(id);
  }
}
