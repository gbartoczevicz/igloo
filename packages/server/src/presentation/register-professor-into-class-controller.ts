import { Controller, HttpResult } from "~/contracts/presentation";
import { RegisterProfessorIntoClassUseCase } from "~/domain/usecases";
import { RegisterProfessorIntoClassDTO } from "./register-professor-into-class-dto";

export class RegisterProfessorIntoClassController extends Controller {
  private readonly usecase: RegisterProfessorIntoClassUseCase;

  public constructor(usecase: RegisterProfessorIntoClassUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const data = RegisterProfessorIntoClassDTO.In.create(incoming);

    const result = await this.usecase.execute(data);

    return this.onCreated(RegisterProfessorIntoClassDTO.Out.toRaw(result));
  }
}
