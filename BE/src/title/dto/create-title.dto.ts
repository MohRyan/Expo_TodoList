import { IsString } from "class-validator";

export class CreateTitleDto {
  @IsString()
  title: string;
}
