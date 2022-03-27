import { OutDTO } from "~/contracts/dtos";
import { Student } from "~/domain/entities";

export class CreateStudentOut extends OutDTO<Student> {
  public constructor(outcoming: Student) {
    super(outcoming);
  }

  public toRaw(): unknown {
    return {
      id: this.outcoming.id.value,
      userId: this.outcoming.userId.value,
      institutionId: this.outcoming.institutionId.value,
    };
  }
}
