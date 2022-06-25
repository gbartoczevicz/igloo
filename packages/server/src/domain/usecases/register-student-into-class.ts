import {
  ClassCoursesRepo,
  StudentClassRegistrationsRepo,
  StudentsRepo,
} from "~/contracts/database/repositories";
import { InstitutionManager, StudentClassRegistration } from "../entities";
import { StudentClassRegistrationFactory } from "../factories";
import * as Errors from "~/domain/errors";

type Params = {
  studentId: string;
  classCourseId: string;
  manager: InstitutionManager;
};

export class RegisterStudentIntoClassUseCase {
  private readonly registrationFactory: StudentClassRegistrationFactory;

  private readonly registrationsRepo: StudentClassRegistrationsRepo;

  private readonly classCoursesRepo: ClassCoursesRepo;

  private readonly studentsRepo: StudentsRepo;

  public constructor(
    registrationsRepo: StudentClassRegistrationsRepo,
    registrationFactory: StudentClassRegistrationFactory,
    classCoursesRepo: ClassCoursesRepo,
    studentsRepo: StudentsRepo,
  ) {
    this.registrationFactory = registrationFactory;
    this.registrationsRepo = registrationsRepo;
    this.classCoursesRepo = classCoursesRepo;
    this.studentsRepo = studentsRepo;
  }

  public async execute(params: Params): Promise<StudentClassRegistration> {
    const { manager, ...delegate } = params;

    const registration = this.registrationFactory.create(delegate);

    const studentFound = await this.studentsRepo.findByIdAndInstitutionId(
      registration.studentId,
      manager.institutionId,
    );

    if (!studentFound) {
      throw new Errors.StudentNotFound();
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
      .findByStudentAndClassCourse(
        registration.studentId,
        registration.classCourseId,
      );

    if (registrationFound) {
      throw new Errors.StudentClassCourseRegistrationAlreadyCreated();
    }

    await this.registrationsRepo.save(registration);

    return registration;
  }
}
