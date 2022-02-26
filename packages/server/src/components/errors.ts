export class RequiredDependencies extends Error {
  public constructor() {
    super("Dependencies must not be empty or nullish");
  }
}

export class InvalidDependencies extends Error {
  public constructor() {
    super("Dependencies must be an Map or Array instance");
  }
}

export class LifecycleNotFound extends Error {
  public constructor(key: string) {
    super(`The lifecycle ${key} was not found`);
  }
}
