import { HttpResult } from "~/contracts/presentation";
import {
  CreateInstitutionManagerUseCase,
  CreateInstitutionUseCase,
} from "~/domain/usecases";
import { Controller } from "./controller";
import { CreateInstitutionAndManagerDTO } from "./create-institution-and-manager-dto";

export class CreateInstitutionAndManagerController extends Controller {
  private readonly createInstitutionUseCase: CreateInstitutionUseCase;

  private readonly createManagerUseCase: CreateInstitutionManagerUseCase;

  public constructor(
    createInstitutionUseCase: CreateInstitutionUseCase,
    createManagerUseCase: CreateInstitutionManagerUseCase,
  ) {
    super();

    this.createInstitutionUseCase = createInstitutionUseCase;
    this.createManagerUseCase = createManagerUseCase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingManagerAndInstitution = CreateInstitutionAndManagerDTO.In
      .create(incoming);

    const institutionCreated = await this.createInstitutionUseCase.execute(
      incomingManagerAndInstitution,
    );

    const managerCreated = await this.createManagerUseCase.execute(
      incomingManagerAndInstitution.user,
      institutionCreated,
    );

    const outcoming = CreateInstitutionAndManagerDTO.Out.toRaw(
      managerCreated,
      institutionCreated,
    );

    return this.onCreated(outcoming);
  }
}
