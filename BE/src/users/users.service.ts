import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.users.findMany({
      include: {
        todoTitle: {
          include: {
            todo: true,
          },
        },
      },
    });
  }

  async findOne(userId: string) {
    const user = await this.prisma.users.findFirst({
      where: {
        id: userId,
      },
      select: {
        fullname: true,
      },
    });
    console.log("🚀 ~ UsersService ~ findOne ~ user:", user);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
