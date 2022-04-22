import { HttpResult } from "~/contracts/presentation";
import { CreateProfessorUseCase } from "~/domain/usecases";
import { Controller } from "./controller";
import { CreateProfessorDTO } from "./create-professor-dto";

export class CreateProfessorController extends Controller {
  private readonly usecase: CreateProfessorUseCase;

  public constructor(usecase: CreateProfessorUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingProfessor = CreateProfessorDTO.In.create(incoming);

    const professorCreated = await this.usecase.execute(incomingProfessor);

    const outcoming = CreateProfessorDTO.Out.toRaw(professorCreated);

    return this.onCreated(outcoming);
  }
}
