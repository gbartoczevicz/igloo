import * as P from "~/contracts/presentation";
import * as D from "~/dtos";
import { CreateProfessorOut } from "~/dtos";
import { CreateProfessorUseCase } from "../usecases";

export class CreateProfessorController
  extends P.Controller<D.CreateProfessorIn, D.CreateProfessorOut> {
  private readonly usecase: CreateProfessorUseCase;

  public constructor(usecase: CreateProfessorUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(
    incoming: D.CreateProfessorIn,
  ): Promise<P.HttpResult<D.CreateProfessorOut>> {
    const professorCreated = await this.usecase.execute(incoming);

    const outcoming = new CreateProfessorOut(professorCreated);

    return this.onCreated(outcoming);
  }
}
