import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
