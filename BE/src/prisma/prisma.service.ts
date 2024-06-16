import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from "@nestjs/common";
import { PrismaClient, Prisma } from "@prisma/client";

@Injectable()
// extends PrismaClient
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
      ],
    });

    this.$on("query", (event: Prisma.QueryEvent) => {
      this.logger.debug(`Query: ${event.query}`);
      this.logger.debug(`Params: ${event.params}`);
      this.logger.debug(`Duration: ${event.duration}ms`);
    });

    this.$on("info", (event: Prisma.LogEvent) => {
      this.logger.log(event.message);
    });

    this.$on("warn", (event: Prisma.LogEvent) => {
      this.logger.warn(event.message);
    });

    this.$on("error", (event: Prisma.LogEvent) => {
      this.logger.error(event);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
