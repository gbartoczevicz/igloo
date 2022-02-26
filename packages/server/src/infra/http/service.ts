export abstract class Service<T> {
  protected readonly application: T;

  public constructor(application: T) {
    this.application = application;
  }

  public abstract listen(port: number): Promise<void>;
  public abstract close(): Promise<void>;
}
