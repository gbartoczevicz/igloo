import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { CreateSessionUseCase } from "../usecases";

export class CreateSessionController
  extends P.Controller<D.CreateSessionIn, D.CreateSessionOut> {
  private readonly createSessionUseCase: CreateSessionUseCase;

  public constructor(useCase: CreateSessionUseCase) {
    super();

    this.createSessionUseCase = useCase;
  }

  protected override async handle(
    incoming: D.CreateSessionIn,
  ): Promise<P.HttpResult<D.CreateSessionOut>> {
    const sessionCreated = await this.createSessionUseCase.create(incoming);

    const outcoming = new D.CreateSessionOut(sessionCreated);

    return this.onCreated(outcoming);
  }
}
