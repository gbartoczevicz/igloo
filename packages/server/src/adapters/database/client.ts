import { PrismaClient } from "@prisma/client";
import { ClientDatabase } from "~/contracts/database/client";

export class PrismaClientDatabase extends ClientDatabase<PrismaClient> {
  public constructor(client: PrismaClient) {
    super(client);
  }

  public async connect(): Promise<void> {
    await this.client.$connect().then(() =>
      console.log("Connection with database was estabilished")
    );
  }

  public async disconnect(): Promise<void> {
    await this.client.$disconnect().then(() =>
      console.log("Connection with database was closed")
    );
  }
}
