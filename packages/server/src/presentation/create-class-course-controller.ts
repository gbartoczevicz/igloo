import { Controller, HttpResult } from "~/contracts/presentation";
import { CreateClassCourseUseCase } from "~/domain/usecases";
import { CreateClassCourseDTO } from "./create-class-course-dto";

export class CreateClassCourseController extends Controller {
  private readonly usecase: CreateClassCourseUseCase;

  public constructor(usecase: CreateClassCourseUseCase) {
    super();
    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const incomingClassCourse = CreateClassCourseDTO.In.create(incoming);

    const classCourseCreated = await this.usecase.execute(incomingClassCourse);

    const outcoming = CreateClassCourseDTO.Out.toRaw(classCourseCreated);

    return this.onOk(outcoming);
  }
}
