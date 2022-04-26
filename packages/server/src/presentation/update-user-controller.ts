import { HttpResult } from "~/contracts/presentation";
import { UpdateUserUseCase } from "~/domain/usecases";
import { Controller } from "../contracts/presentation/controller";
import { UpdateUserDTO } from "./update-user-dto";

export class UpdateUserController extends Controller {
  private readonly usecase: UpdateUserUseCase;

  public constructor(usecase: UpdateUserUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const toUpdateUser = UpdateUserDTO.In.create(incoming);

    const userUpdated = await this.usecase.execute(toUpdateUser);

    const outcoming = UpdateUserDTO.Out.toRaw(userUpdated);

    return this.onOk(outcoming);
  }
}
