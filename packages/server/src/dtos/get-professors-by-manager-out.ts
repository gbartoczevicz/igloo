import { OutDTO } from "~/contracts/dtos";
import { ProfessorUserComposition } from "~/domain/entities";

export class GetProfessorsByManagerOut
  extends OutDTO<ProfessorUserComposition[]> {
  public constructor(outcoming: ProfessorUserComposition[]) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return this.outcoming.map((o) => ({
      id: o.professor.id.value,
      user: {
        id: o.user.id.value,
        name: o.user.name,
        surname: o.user.surname,
        email: o.user.email.toString(),
        phone: o.user.phone.toString(),
      },
    }));
  }
}
