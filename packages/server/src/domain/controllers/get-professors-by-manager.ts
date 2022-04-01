import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { GetProfessorsByManagerUseCase } from "../usecases";

export class GetProfessorsByManagerController extends P.Controller<
  D.GetProfessorsByManagerIn,
  D.GetProfessorsByManagerOut
> {
  private readonly usecase: GetProfessorsByManagerUseCase;

  public constructor(usecase: GetProfessorsByManagerUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.GetProfessorsByManagerIn,
  ): Promise<P.Result<D.GetProfessorsByManagerOut>> {
    const professorsFound = await this.usecase.execute(incoming.manager);

    const outcoming = new D.GetProfessorsByManagerOut(professorsFound);

    return this.onOk(outcoming);
  }
}
