export class InvalidField extends Error {
  public readonly field: string;

  public constructor(field: string, message: string) {
    super(message);
    this.field = field;
  }
}
