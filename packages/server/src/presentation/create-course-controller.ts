import { Controller, HttpResult } from "~/contracts/presentation";
import { CreateCourseUseCase } from "~/domain/usecases";
import { CreateCourseDTO } from "./create-course-dto";

export class CreateCourseController extends Controller {
  private readonly usecase: CreateCourseUseCase;

  public constructor(usecase: CreateCourseUseCase) {
    super();

    this.usecase = usecase;
  }

  protected override async handle(incoming: unknown): Promise<HttpResult> {
    const course = CreateCourseDTO.In.create(incoming);

    const createdCourse = await this.usecase.execute(course);

    const outcoming = CreateCourseDTO.Out.toRaw(createdCourse);

    return this.onOk(outcoming);
  }
}
