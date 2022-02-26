import { Server } from "http";
import { Application } from "express";

import { Service } from "~/contracts/http";

export class HttpService extends Service<Application> {
  private server?: Server;

  public constructor(application: Application) {
    super(application);
  }

  public listen(port: number): void {
    this.server = this.application.listen(port, () => {
      console.log("The service has been started", port);
    });
  }

  public close(): void {
    this.server?.close((err) =>
      console.log("The service has been closed", err)
    );
  }
}
