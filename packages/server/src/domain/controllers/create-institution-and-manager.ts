import { OutDTO } from "~/contracts/dtos";
import * as P from "~/contracts/presentation";
import {
  CreateInstitutionAndManagerIn,
  CreateInstitutionAndManagerOut,
} from "~/dtos";
import {
  CreateInstitutionManagerUseCase,
  CreateInstitutionUseCase,
} from "../usecases";

export class CreateInstitutionAndManagerController extends P.Controller<
  CreateInstitutionAndManagerIn,
  CreateInstitutionAndManagerOut
> {
  private readonly createInstitutionUseCase: CreateInstitutionUseCase;

  private readonly createManager: CreateInstitutionManagerUseCase;

  public constructor(
    createInstitutionUseCase: CreateInstitutionUseCase,
    createManager: CreateInstitutionManagerUseCase,
  ) {
    super();

    this.createInstitutionUseCase = createInstitutionUseCase;
    this.createManager = createManager;
  }

  protected override async handle(
    incoming: CreateInstitutionAndManagerIn,
  ): Promise<P.HttpResult<CreateInstitutionAndManagerOut>> {
    const institutionCreated = await this.createInstitutionUseCase.execute(
      incoming.createInstitutionIn,
    );

    const managerCreated = await this.createManager.execute(
      incoming.user,
      institutionCreated,
    );

    const outcoming = new CreateInstitutionAndManagerOut([
      managerCreated,
      institutionCreated,
    ]);

    return this.onCreated(outcoming);
  }
}
