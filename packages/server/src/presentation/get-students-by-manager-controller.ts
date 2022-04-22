import { HttpResult } from "~/contracts/presentation";
import { GetStudentsByManagerUseCase } from "~/domain/usecases";
import { Controller } from "./controller";
import { GetStudentsByManagerDTO } from "./get-students-by-manager-dto";

export class GetStudentsByManagerController extends Controller {
  private readonly usecase: GetStudentsByManagerUseCase;

  public constructor(usecase: GetStudentsByManagerUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingManager = GetStudentsByManagerDTO.In.create(incoming);

    const professorsFound = await this.usecase.execute(incomingManager.manager);

    const outcoming = GetStudentsByManagerDTO.Out.toRaw(professorsFound);

    return this.onOk(outcoming);
  }
}
