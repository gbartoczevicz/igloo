import {
  ClassCoursesRepo,
  ProfessorClassRegistrationsRepo,
  ProfessorsRepo,
} from "~/contracts/database/repositories";
import { InstitutionManager, ProfessorClassRegistration } from "../entities";
import { ProfessorClassRegistrationFactory } from "../factories";
import * as Errors from "~/domain/errors";

type Params = {
  professorId: string;
  classCourseId: string;
  manager: InstitutionManager;
};

export class RegisterProfessorIntoClassUseCase {
  private readonly registrationFactory: ProfessorClassRegistrationFactory;

  private readonly registrationsRepo: ProfessorClassRegistrationsRepo;

  private readonly classCoursesRepo: ClassCoursesRepo;

  private readonly professorsRepo: ProfessorsRepo;

  public constructor(
    registrationsRepo: ProfessorClassRegistrationsRepo,
    registrationFactory: ProfessorClassRegistrationFactory,
    classCoursesRepo: ClassCoursesRepo,
    professorsRepo: ProfessorsRepo,
  ) {
    this.registrationFactory = registrationFactory;
    this.registrationsRepo = registrationsRepo;
    this.classCoursesRepo = classCoursesRepo;
    this.professorsRepo = professorsRepo;
  }

  public async execute(params: Params): Promise<ProfessorClassRegistration> {
    const { manager, ...delegate } = params;

    const registration = this.registrationFactory.create(delegate);

    const professorFound = await this.professorsRepo.findByIdAndInstitutionId(
      registration.professorId,
      manager.institutionId,
    );

    if (!professorFound) {
      throw new Errors.ProfessorNotFound();
    }

    const classCourseFound = await this.classCoursesRepo
      .findByIdAndInstitutionId(
        registration.classCourseId,
        manager.institutionId,
      );

    if (!classCourseFound) {
      throw new Errors.ClassCourseNotFound();
    }

    const registrationFound = await this.registrationsRepo
      .findByProfessorAndClassCourse(
        registration.professorId,
        registration.classCourseId,
      );

    if (registrationFound) {
      throw new Errors.ProfessorClassCourseRegistrationAlreadyCreated();
    }

    await this.registrationsRepo.save(registration);

    return registration;
  }
}
