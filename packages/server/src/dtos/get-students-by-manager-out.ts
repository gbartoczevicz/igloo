import { OutDTO } from "~/contracts/dtos";
import { StudentUserComposition } from "~/domain/entities";

export class GetStudentsByManagerOut extends OutDTO<StudentUserComposition[]> {
  public constructor(outcoming: StudentUserComposition[]) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return this.outcoming.map((o) => ({
      id: o.student.id.value,
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
