import { ProfessorClassRegistration } from "../entities";
import { IdFactory } from "./id-factory";

type Params = {
  id?: string;
  professorId: string;
  classCourseId: string;
};

export class ProfessorClassRegistrationFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(params: Params): ProfessorClassRegistration {
    const id = this.idFactory.create(params.id);
    const professorId = this.idFactory.create(params.professorId);
    const classCourseId = this.idFactory.create(params.classCourseId);

    return new ProfessorClassRegistration(id, professorId, classCourseId);
  }
}
