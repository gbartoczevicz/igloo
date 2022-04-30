import { Controller, HttpResult } from "~/contracts/presentation";
import { CreateDisciplinesUseCase } from "~/domain/usecases";
import { CreateDisciplineDTO } from "./create-discipline-dto";

export class CreateDisciplineController extends Controller {
  private readonly usecase: CreateDisciplinesUseCase;

  public constructor(usecase: CreateDisciplinesUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const incomingDiscipline = CreateDisciplineDTO.In.create(incoming);

    const createdDiscipline = await this.usecase.execute(incomingDiscipline);

    const outcoming = CreateDisciplineDTO.Out.toRaw(createdDiscipline);

    return this.onCreated(outcoming);
  }
}
