import { IsArray, IsEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  todoImage: string[];
}
