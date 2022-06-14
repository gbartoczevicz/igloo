import { ClassCoursesRepo } from "~/contracts/database/repositories";
import { ClassCourse } from "../entities";
import { IdFactory } from "../factories";

type Params = {
  institutionId: string;
};

export class ListInstitutionClassCoursesUseCase {
  private readonly classCoursesRepo: ClassCoursesRepo;

  private readonly idFactory: IdFactory;

  public constructor(classCoursesRepo: ClassCoursesRepo, idFactory: IdFactory) {
    this.classCoursesRepo = classCoursesRepo;
    this.idFactory = idFactory;
  }

  public async execute(params: Params): Promise<ClassCourse[]> {
    const id = this.idFactory.create(params.institutionId);

    return await this.classCoursesRepo.listByInstitutionId(id);
  }
}
