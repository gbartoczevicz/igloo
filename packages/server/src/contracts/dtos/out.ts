export abstract class OutDTO<T> {
  protected readonly outcoming: T;

  public constructor(outcoming: T) {
    this.outcoming = outcoming;
  }

  abstract toRaw(): unknown;
}
