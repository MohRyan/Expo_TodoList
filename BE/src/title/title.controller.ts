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
import { TitleService } from "./title.service";
import { CreateTitleDto } from "./dto/create-title.dto";
import { UpdateTitleDto } from "./dto/update-title.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("title")
export class TitleController {
  constructor(
    private readonly titleService: TitleService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createTitleDto: CreateTitleDto,
    // @UploadedFiles() files: Array<Express.Multer.File>,
    @Request() req,
  ) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token not provided");
    }

    try {
      const decoded = this.jwtService.decode(token) as any;
      const userId = decoded.id;

      return this.titleService.create(createTitleDto, userId);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  @Get()
  findAll(@Request() req) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token not provided");
    }

    try {
      const decoded = this.jwtService.decode(token) as any;
      const userId = decoded.id;

      return this.titleService.findAll(userId);
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.titleService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTitleDto: UpdateTitleDto) {
    return this.titleService.update(id, updateTitleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.titleService.remove(id);
  }
}
