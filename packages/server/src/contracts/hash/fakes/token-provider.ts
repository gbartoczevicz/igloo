import { TokenProvider } from "../token-provider";

export class FakeTokenProvider extends TokenProvider {
  public decode(_plain: string): object {
    return {};
  }

  public encode(_content: object): string {
    return "encoded";
  }
}
