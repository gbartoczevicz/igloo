import { IdProvider } from "../id-provider";

export class FakeIdProvider implements IdProvider {
  public generate(): string {
    return "any";
  }
}
