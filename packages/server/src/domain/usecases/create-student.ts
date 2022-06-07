import { StudentsRepo, UsersRepo } from "~/contracts/database/repositories";
import * as Errors from "~/domain/errors";
import { InstitutionManager, Student } from "../entities";
import { IdFactory, StudentFactory } from "../factories";

type Params = {
  studentUserId: string;
  manager: InstitutionManager;
};

export class CreateStudentUseCase {
  private readonly studentsRepo: StudentsRepo;

  private readonly usersRepo: UsersRepo;

  private readonly studentFactory: StudentFactory;

  private readonly idFactory: IdFactory;

  public constructor(
    studentsRepo: StudentsRepo,
    usersRepo: UsersRepo,
    studentFactory: StudentFactory,
    idFactory: IdFactory,
  ) {
    this.studentsRepo = studentsRepo;
    this.usersRepo = usersRepo;
    this.studentFactory = studentFactory;
    this.idFactory = idFactory;
  }

  public async execute(incoming: Params): Promise<Student> {
    const { manager } = incoming;

    const studentUserId = this.idFactory.create(incoming.studentUserId);

    const isAlreadyAManager = manager.userId.isEqual(studentUserId);

    if (isAlreadyAManager) {
      throw new Errors.UserToBeStudentIsAlreadyAManager();
    }

    const alreadyRegistered = await this.studentsRepo
      .findByInstitutionAndUser(manager.institutionId, studentUserId);

    if (alreadyRegistered) {
      throw new Errors.StudentAlreadyCreated();
    }

    const userExists = await this.usersRepo.findById(studentUserId);

    if (!userExists) {
      throw new Errors.UserToBeStudentDoesNotExists();
    }

    const student = this.studentFactory.create({
      institutionId: manager.institutionId,
      userId: studentUserId,
    });

    await this.studentsRepo.save(student);

    return student;
  }
}
