import {
  CoursesRepo,
  DisciplinesRepo,
} from "~/contracts/database/repositories";
import { Discipline } from "../entities";
import { Id } from "../entities/values";

type Params = {
  institutionId: Id;
};

export class ListInstitutionDisciplinesUseCase {
  private readonly disciplinesRepo: DisciplinesRepo;

  private readonly coursesRepo: CoursesRepo;

  public constructor(
    disciplinesRepo: DisciplinesRepo,
    coursesRepo: CoursesRepo,
  ) {
    this.disciplinesRepo = disciplinesRepo;
    this.coursesRepo = coursesRepo;
  }

  public async execute(params: Params): Promise<Discipline[]> {
    const coursesFound = await this.coursesRepo
      .findAllByInstitutionId(params.institutionId);

    const coursesId = coursesFound.map((course) => course.id);

    return await this.disciplinesRepo.findAllByCoursesId(coursesId);
  }
}
