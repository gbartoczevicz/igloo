import {
  CoursesRepo,
  DisciplinesRepo,
} from "~/contracts/database/repositories";
import { DomainError } from "~/errors";
import { Discipline } from "../entities";
import { DisciplineFactory } from "../factories";

type Params = {
  name: string;
  courseId: string;
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
    const discipline = this.disciplineFactory.create(params);

    const courseExists = await this.coursesRepo.findById(discipline.courseId);

    if (!courseExists) {
      throw new DomainError("The course does not exists");
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
