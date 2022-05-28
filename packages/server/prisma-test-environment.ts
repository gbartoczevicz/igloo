import NodeEnvironment from "jest-environment-node";
import { randomUUID } from "crypto";
import { promisify } from "util";
import { exec } from "child_process";
import { Client } from "pg";

export default class PrismaTestEnvironment extends NodeEnvironment {
  private readonly schema: string;

  private readonly connectionString: string;

  public constructor(config: any, _context: any) {
    super(config, _context);

    const {
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DATABASE_HOSTNAME,
      DATABASE_PORT,
      DATABASE_NAME,
    } = process.env;

    this.schema = `test_${randomUUID()}`;

    this.connectionString =
      `postgresql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}:${DATABASE_PORT}/${DATABASE_NAME}?schema=${this.schema}`;
  }

  public override async setup(): Promise<void> {
    process.env.DATABASE_URL = this.connectionString;

    this.global.process.env.DATABASE_URL = this.connectionString;

    const result = await promisify(exec)(
      `./node_modules/.bin/prisma migrate deploy --preview-featur`,
    );

    console.log("PrismaTestEnvironment.setup", result);

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
