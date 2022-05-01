import {
  CoursesRepo,
  DisciplinesRepo,
} from "~/contracts/database/repositories";
import { Discipline } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  institutionId: string;
};

export class ListInstitutionDisciplinesUseCase {
  private readonly disciplinesRepo: DisciplinesRepo;

  private readonly coursesRepo: CoursesRepo;

  private readonly idFactory: IdFactory;

  public constructor(
    disciplinesRepo: DisciplinesRepo,
    coursesRepo: CoursesRepo,
    idFactory: IdFactory,
  ) {
    this.disciplinesRepo = disciplinesRepo;
    this.coursesRepo = coursesRepo;
    this.idFactory = idFactory;
  }

  public async execute(params: Params): Promise<Discipline[]> {
    const id = this.idFactory.create(params.institutionId);

    const coursesFound = await this.coursesRepo
      .findAllByInstitutionId(id);

    const coursesId = coursesFound.map((course) => course.id);

    return await this.disciplinesRepo.findAllByCoursesId(coursesId);
  }
}
