import { HttpResult } from "~/contracts/presentation";
import { CreateStudentUseCase } from "~/domain/usecases";
import { Controller } from "../contracts/presentation/controller";
import { CreateStudentDTO } from "./create-student-dto";

export class CreateStudentController extends Controller {
  private readonly usecase: CreateStudentUseCase;

  public constructor(usecase: CreateStudentUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingStudent = CreateStudentDTO.In.create(incoming);

    const studentCreated = await this.usecase.execute(incomingStudent);

    const outcoming = CreateStudentDTO.Out.toRaw(studentCreated);

    return this.onCreated(outcoming);
  }
}
