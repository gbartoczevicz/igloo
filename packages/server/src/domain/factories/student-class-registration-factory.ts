import { StudentClassRegistration } from "../entities";
import { IdFactory } from "./id-factory";

type Params = {
  studentId: string;
  classCourseId: string;
};

export class StudentClassRegistrationFactory {
  private readonly idFactory: IdFactory;

  public constructor(idFactory: IdFactory) {
    this.idFactory = idFactory;
  }

  public create(params: Params): StudentClassRegistration {
    const studentId = this.idFactory.create(params.studentId);
    const classCourseId = this.idFactory.create(params.classCourseId);

    return new StudentClassRegistration(studentId, classCourseId);
  }
}
