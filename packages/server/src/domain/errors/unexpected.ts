import { Id } from "../entities/values";

export class UserNotFoundWithProfessor extends Error {
  public constructor(id: Id) {
    super(`User not found with professor ${id.value}`);
  }
}

export class UserNotFoundWithStudent extends Error {
  public constructor(id: Id) {
    super(`User not found with student ${id.value}`);
  }
}

export class UserNotRelatedWithAnyInstitution extends Error {
  public constructor() {
    super("The user is not related with any institution");
  }
}
