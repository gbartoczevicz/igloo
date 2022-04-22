import { HttpResult } from "~/contracts/presentation";
import { GetUsersUseCase } from "~/domain/usecases";
import { Controller } from "./controller";
import { GetUsersDTO } from "./get-users-dto";

export class GetUsersController extends Controller {
  private readonly usecase: GetUsersUseCase;

  public constructor(usecase: GetUsersUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(): Promise<HttpResult> {
    const usersFound = await this.usecase.execute();

    const outcoming = GetUsersDTO.Out.toRaw(usersFound);

    return this.onOk(outcoming);
  }
}
