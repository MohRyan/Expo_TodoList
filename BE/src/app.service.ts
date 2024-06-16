import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World! ini percobaan dengan nodemon coba lagi";
  }
}
