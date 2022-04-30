import {
  CoursesRepo,
  DisciplinesRepo,
} from "~/contracts/database/repositories";
import { DomainError, ForbiddenError } from "~/errors";
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

    const courseExists = await this.coursesRepo.findById(discipline.courseId);

    if (!courseExists) {
      throw new DomainError("The course does not exists");
    }

    const isTheCourseFromTheSameInstitution = manager.institutionId
      .isEqual(courseExists.institutionId);

    if (!isTheCourseFromTheSameInstitution) {
      throw new ForbiddenError("The course doesn't belong to the institution");
    }

    const registeredDisciplines = await this.disciplinesRepo.findAllByCourseId(
      discipline.courseId,
    );

    const withSameName = registeredDisciplines.find((registeredDisciplines) =>
      registeredDisciplines.name.toLowerCase() === discipline.name.toLowerCase()
    );

    if (withSameName) {
      throw new DomainError("The discipline name is already in use");
    }

    await this.disciplinesRepo.save(discipline);

    return discipline;
  }
}
