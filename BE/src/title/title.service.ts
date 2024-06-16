import { Injectable } from "@nestjs/common";
import { CreateTitleDto } from "./dto/create-title.dto";
import { UpdateTitleDto } from "./dto/update-title.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TitleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTitleDto: CreateTitleDto, userId: string) {
    const addTodoTitle = await this.prisma.todoTitle.create({
      data: {
        userId,
        title: createTitleDto.title,
      },
    });
    console.log("🚀 ~ TodoService ~ addTodo:");
    return {
      status: true,
      data: addTodoTitle,
    };
  }

  async findAll(userId: string) {
    return await this.prisma.todoTitle.findMany({
      where: {
        userId,
      },
      include: {
        todo: {
          select: {
            description: true,
            status: true,
          },
        },
      },
    });
  }
  async findAllById(userId: string) {
    return await this.prisma.todoTitle.findMany({
      where: {
        userId,
      },
      include: {
        todo: {
          select: {
            description: true,
            status: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    try {
      const todoUser = await this.prisma.todoTitle.findFirst({
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

  async update(id: string, updateTitleDto: UpdateTitleDto) {
    try {
      const todoUser = await this.prisma.todoTitle.findFirst({
        where: {
          id,
        },
      });

      if (!todoUser) {
        return "Todo is Not-Found";
      }

      const updateTodoTitle = await this.prisma.todoTitle.update({
        where: { id },
        data: {
          ...updateTitleDto,
        },
      });

      return {
        status: true,
        data: updateTodoTitle,
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
    return await this.prisma.todoTitle.delete({
      where: { id },
    });
  }
}
