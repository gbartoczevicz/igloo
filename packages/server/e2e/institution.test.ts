/**
 * @jest-environment ./prisma-test-environment.ts
 */
import { system } from "~/system";
import { randomUUID } from "crypto";
import {
  createCreateInstitutionClient,
  createUserClient,
  createUserSessionClient,
} from "./helpers/http-client";
import { HttpStatus } from "~/contracts/http";

describe("Institution Tests", () => {
  let userId: string;
  let sessionToken: string;
  let institution: any;

  beforeAll(async () => {
    const user = {
      email: `user+${randomUUID()}@email.com`,
      password: randomUUID(),
      name: `A user ${randomUUID()}`,
      surname: "The user's surname",
      phone: "(99) 9000-0000",
    };

    await system.start();

    await createUserClient()(user);
    const { body: { token, userId: id } } = await createUserSessionClient()(
      user,
    );

    sessionToken = token;
    userId = id;
  });

  afterAll(async () => {
    await system.stop();
  });

  describe("Institution creation", () => {
    it("should create an institution successfully", async () => {
      const sut = createCreateInstitutionClient(sessionToken);

      const institutionToCreate = {
        name: "institution's name",
        cnpj: "63.633.950/0001-73",
        phone: "(43) 90000-0000",
      };

      const { body, status } = await sut(institutionToCreate);

      expect(status).toEqual(HttpStatus.created);
      expect(body.id).toBeDefined();
      expect(body.name).toEqual(institutionToCreate.name);
      expect(body.cnpj).toEqual(institutionToCreate.cnpj);
      expect(body.phone).toEqual(institutionToCreate.phone);
      expect(body.manager.id).toBeDefined();
      expect(body.manager.userId).toEqual(userId);

      institution = body;
    });

    it.todo("ye", () => {
      console.log(institution);
    });
  });
});
