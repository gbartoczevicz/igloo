import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { CreateStudentOut } from "~/dtos";
import { CreateStudentUseCase } from "../usecases";

export class CreateStudentController
  extends P.Controller<D.CreateStudentIn, D.CreateStudentOut> {
  private readonly usecase: CreateStudentUseCase;

  public constructor(usecase: CreateStudentUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.CreateStudentIn,
  ): Promise<P.Result<D.CreateStudentOut>> {
    const studentCreated = await this.usecase.execute(incoming);

    const outcoming = new CreateStudentOut(studentCreated);

    return this.onCreated(outcoming);
  }
}
