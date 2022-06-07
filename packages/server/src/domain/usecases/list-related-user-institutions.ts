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
        const relations: UserRoleInInstitution[] = [];

        const student = students.find((student) =>
          student.institutionId.isEqual(institution.id)
        );

        if (student) {
          relations.push({ institution, userRole: UserRole.student });
        }

        const professor = professors.find((professor) =>
          professor.institutionId.isEqual(institution.id)
        );

        if (professor) {
          relations.push({
            institution,
            userRole: UserRole.professor,
          });
        }

        const manager = managers.find((manager) =>
          manager.institutionId.isEqual(institution.id)
        );

        if (manager) {
          relations.push({
            institution,
            userRole: UserRole.manager,
          });
        }

        if (relations.length === 0) {
          throw new Errors.UserNotRelatedWithAnyInstitution();
        }

        return relations;
      },
    ).flat();

    return new UserRelatedInstitutions(institutionRoles);
  }
}
