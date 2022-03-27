import { PrismaClient } from "@prisma/client";
import { PrismaClientDatabase } from "./adapters/database/client";
import { Database } from "./components/database";
import { ApplicationConfig } from "./config";
import { ClientDatabase } from "./contracts/database/client";

export function createDatabase(config: ApplicationConfig) {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: config.databaseUrl,
      },
    },
  });

  const databaseClient: ClientDatabase<PrismaClient> = new PrismaClientDatabase(
    prisma,
  );

  return new Database(databaseClient);
}
