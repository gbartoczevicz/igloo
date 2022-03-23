import { OutDTO } from "~/contracts/dtos";
import { SessionToken } from "~/domain/entities";

export class CreateSessionOut extends OutDTO<SessionToken> {
  public constructor(outcoming: SessionToken) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return {
      userId: this.outcoming.userId.value,
      token: this.outcoming.token,
    };
  }
}
