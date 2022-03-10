export class Id {
  public readonly value: string;

  public constructor(value: string) {
    this.value = value;
  }

  public isEqual(value: Id | string): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (value instanceof Id) {
      return this.value === value.value;
    }

    return this.value === value;
  }
}
