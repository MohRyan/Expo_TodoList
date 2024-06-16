import { Injectable } from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as fs from "fs";
import cloudinary from "src/config/cloudinary";

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTodoDto: CreateTodoDto, id: string) {
    const titleId = await this.prisma.todoTitle.findFirst({
      where: { id },
    });
    console.log("🚀 ~ TodoService ~ create ~ titleId:", titleId);

    const addTodo = await this.prisma.todo.create({
      data: {
        titleId: id,
        description: createTodoDto.description,
      },
    });
    return {
      status: true,
      data: addTodo,
      message: "Create Todo Successss!!",
    };
  }

  async findAll(id: string) {
    return await this.prisma.todo.findMany({
      where: { titleId: id },
    });
  }

  async findOne(id: string) {
    try {
      const todoUser = await this.prisma.todo.findFirst({
        where: {
          id,
        },
      });

      if (!todoUser) {
        return "Todo is Not-Found";
      }

      return {
        status: true,
        data: todoUser,
        message: "sucessss",
      };
    } catch (error) {
      console.log("🚀 ~ TodoService ~ findOne ~ error:", error);
      return {
        status: false,
        message: "Error Call",
      };
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const updateTodo = await this.prisma.todo.update({
        where: { id },
        data: {
          description: updateTodoDto.description,
          status: updateTodoDto.status,
        },
      });

      return {
        status: true,
        data: updateTodo,
        message: "sucessss",
      };
    } catch (error) {
      console.log("🚀 ~ TodoService ~ findOne ~ error:", error);
      return {
        status: false,
        message: "Error Call",
      };
    }
  }

  async remove(id: string) {
    return await this.prisma.todo.delete({
      where: { id },
    });
  }
}
