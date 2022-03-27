import { OutDTO } from "~/contracts/dtos";
import { Professor } from "~/domain/entities";

export class CreateProfessorOut extends OutDTO<Professor> {
  public constructor(outcoming: Professor) {
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
