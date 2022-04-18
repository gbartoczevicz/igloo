import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { GetStudentsByManagerUseCase } from "../usecases";

export class GetStudentsByManagerController extends P.Controller<
  D.GetStudentsByManagerIn,
  D.GetStudentsByManagerOut
> {
  private readonly usecase: GetStudentsByManagerUseCase;

  public constructor(usecase: GetStudentsByManagerUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.GetStudentsByManagerIn,
  ): Promise<P.HttpResult<D.GetStudentsByManagerOut>> {
    const studentsFound = await this.usecase.execute(incoming.manager);

    const outcoming = new D.GetStudentsByManagerOut(studentsFound);

    return this.onOk(outcoming);
  }
}
