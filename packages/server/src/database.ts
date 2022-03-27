import { PrismaClient } from "@prisma/client";
import { PrismaClientDatabase } from "./adapters/database/client";
import { Database } from "./components/database";
import { ClientDatabase } from "./contracts/database/client";

export function createDatabase() {
  const prisma = new PrismaClient();

  const databaseClient: ClientDatabase<PrismaClient> = new PrismaClientDatabase(
    prisma,
  );

  return new Database(databaseClient);
}
