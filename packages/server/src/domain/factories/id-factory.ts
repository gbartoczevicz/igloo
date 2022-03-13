import { Factory } from "~/contracts/domain";
import { IdProvider } from "~/contracts/hash";
import { Id } from "~/domain/entities/values";

export class IdFactory implements Factory<string | undefined, Id> {
  private readonly idProvider: IdProvider;

  public constructor(idProvider: IdProvider) {
    this.idProvider = idProvider;
  }

  public create(incoming?: string): Id {
    const rawId = incoming ?? this.idProvider.generate();

    return new Id(rawId);
  }
}
