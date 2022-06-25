import { ProfessorClassRegistration } from "~/domain/entities";
import { Options, validator } from "~/lib/validators";

export namespace ListProfessorClassRegistrationInInstitutionDTO {
  export class In {
    private constructor(
      public readonly institutionId: string,
    ) {}

    public static create(incoming: unknown): In {
      const { institutionId } = incoming as any || {};

      const result = validator({
        institutionId: {
          option: Options.requiredString,
          value: institutionId,
        },
      });

      if (result.isRight()) {
        throw result.value;
      }

      return new In(institutionId);
    }
  }

  export class Out {
    public static toRaw(registrations: ProfessorClassRegistration[]) {
      return registrations.map((registration) => ({
        id: registration.id.value,
        professorId: registration.professorId.value,
        classCourseId: registration.classCourseId.value,
      }));
    }
  }
}
