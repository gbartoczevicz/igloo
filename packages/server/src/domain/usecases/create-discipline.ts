import {
  CoursesRepo,
  DisciplinesRepo,
} from "~/contracts/database/repositories";
import * as Errors from "~/domain/errors";
import { Discipline, InstitutionManager } from "../entities";
import { DisciplineFactory } from "../factories";

type Params = {
  name: string;
  courseId: string;
  manager: InstitutionManager;
};

export class CreateDisciplinesUseCase {
  private readonly disciplineFactory: DisciplineFactory;

  private readonly disciplinesRepo: DisciplinesRepo;

  private readonly coursesRepo: CoursesRepo;

  public constructor(
    disciplineFactory: DisciplineFactory,
    disciplinesRepo: DisciplinesRepo,
    coursesRepo: CoursesRepo,
  ) {
    this.disciplineFactory = disciplineFactory;
    this.disciplinesRepo = disciplinesRepo;
    this.coursesRepo = coursesRepo;
  }

  public async execute(params: Params): Promise<Discipline> {
    const { manager, ...delegate } = params;

    const discipline = this.disciplineFactory.create(delegate);

    const courseExists = await this.coursesRepo.findByIdAndInstitutionId(
      discipline.courseId,
      manager.institutionId,
    );

    if (!courseExists) {
      throw new Errors.CourseNotExists();
    }

    const registeredDisciplines = await this.disciplinesRepo.findAllByCourseId(
      discipline.courseId,
    );

    const withSameName = registeredDisciplines.find((registeredDisciplines) =>
      registeredDisciplines.name.toLowerCase() === discipline.name.toLowerCase()
    );

    if (withSameName) {
      throw new Errors.CourseNameAlreadyInUse();
    }

    await this.disciplinesRepo.save(discipline);

    return discipline;
  }
}
