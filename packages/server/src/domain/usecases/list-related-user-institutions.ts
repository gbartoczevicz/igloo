import {
  InstitutionManagersRepo,
  InstitutionsRepo,
  ProfessorsRepo,
  StudentsRepo,
} from "~/contracts/database/repositories";
import {
  User,
  UserRelatedInstitutions,
  UserRoleInInstitution,
} from "../entities";
import { UserRole } from "../entities/values";
import * as Errors from "~/domain/errors";

type Params = {
  user: User;
};

export class ListRelatedUserInstitutionsUseCase {
  public constructor(
    private readonly managersRepo: InstitutionManagersRepo,
    private readonly studentsRepo: StudentsRepo,
    private readonly professorsRepo: ProfessorsRepo,
    private readonly institutionsRepo: InstitutionsRepo,
  ) {}

  public async execute(params: Params): Promise<UserRelatedInstitutions> {
    const { user } = params;

    const [managers, students, professors] = await Promise.all([
      this.managersRepo.findAllByUserId(user.id),
      this.studentsRepo.findAllByUserId(user.id),
      this.professorsRepo.findAllByUserId(user.id),
    ]);

    const institutionIds = [
      ...new Set([
        ...managers.map((manager) => manager.institutionId),
        ...students.map((students) => students.institutionId),
        ...professors.map((professor) => professor.institutionId),
      ]),
    ];

    const institutions = await this.institutionsRepo.findAllById(
      institutionIds,
    );

    const institutionRoles: UserRoleInInstitution[] = institutions.map(
      (institution) => {
        const student = students.find((student) =>
          student.institutionId.isEqual(institution.id)
        );

        if (student) {
          return {
            institution,
            userRole: UserRole.student,
          };
        }

        const professor = professors.find((professor) =>
          professor.institutionId.isEqual(institution.id)
        );

        if (professor) {
          return {
            institution,
            userRole: UserRole.professor,
          };
        }

        const manager = managers.find((manager) =>
          manager.institutionId.isEqual(institution.id)
        );

        if (manager) {
          return {
            institution,
            userRole: UserRole.manager,
          };
        }

        throw new Errors.UserNotRelatedWithAnyInstitution();
      },
    );

    return new UserRelatedInstitutions(institutionRoles);
  }
}
