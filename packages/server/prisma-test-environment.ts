import NodeEnvironment from "jest-environment-node";
import { randomUUID } from "crypto";
import { promisify } from "util";
import { exec } from "child_process";
import { Client } from "pg";

export class PrismaTestEnvironment extends NodeEnvironment {
  private readonly schema: string;

  private readonly connectionString: string;

  public constructor(config: any, _context: any) {
    super(config, _context);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbName = process.env.DATABASE_NAME;

    this.schema = `test_${randomUUID()}`;
    this.connectionString =
      `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  public override async setup(): Promise<void> {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await promisify(exec)(
      `prisma migrate deploy --preview-feature`,
    );

    return super.setup();
  }

  public override async teardown(): Promise<void> {
    const client = new Client({
      connectionString: this.connectionString,
    });

    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
    await client.end();
  }
}
