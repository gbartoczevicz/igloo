import { HttpResult } from "~/contracts/presentation";
import { GetProfessorsByManagerUseCase } from "~/domain/usecases";
import { Controller } from "../contracts/presentation/controller";
import { GetProfessorsByManagerDTO } from "./get-professors-by-manager-dto";

export class GetProfessorsByManagerController extends Controller {
  private readonly usecase: GetProfessorsByManagerUseCase;

  public constructor(usecase: GetProfessorsByManagerUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingManager = GetProfessorsByManagerDTO.In.create(incoming);

    const professorsFound = await this.usecase.execute({
      manager: incomingManager.manager,
    });

    const outcoming = GetProfessorsByManagerDTO.Out.toRaw(professorsFound);

    return this.onOk(outcoming);
  }
}
