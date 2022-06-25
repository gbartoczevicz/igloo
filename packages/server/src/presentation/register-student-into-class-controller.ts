import { Controller, HttpResult } from "~/contracts/presentation";
import { RegisterStudentIntoClassUseCase } from "~/domain/usecases";
import { RegisterStudentIntoClassDTO } from "./register-student-into-class-dto";

export class RegisterStudentIntoClassController extends Controller {
  private readonly usecase: RegisterStudentIntoClassUseCase;

  public constructor(usecase: RegisterStudentIntoClassUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming?: unknown): Promise<HttpResult> {
    const data = RegisterStudentIntoClassDTO.In.create(incoming);

    const result = await this.usecase.execute(data);

    return this.onCreated(RegisterStudentIntoClassDTO.Out.toRaw(result));
  }
}
