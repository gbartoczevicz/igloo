import crypto from "crypto";

import { IdProvider } from "~/contracts/hash";

export class NodeIdProvider implements IdProvider {
  public generate(): string {
    return crypto.randomUUID();
  }
}
