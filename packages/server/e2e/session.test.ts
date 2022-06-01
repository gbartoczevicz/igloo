/**
 * @jest-environment ./prisma-test-environment.ts
 */
import { system } from "~/system";
import { randomUUID } from "crypto";
import { HttpStatus } from "~/contracts/http";
import {
  createUserClient,
  createUserSessionClient,
} from "./helpers/http-client";

const credentials = {
  email: `user+${randomUUID()}@email.com`,
  password: randomUUID(),
};

describe("User session tests", () => {
  beforeAll(async () => {
    await system.start();

    const createUser = createUserClient();

    await createUser({
      ...credentials,
      name: `A user ${randomUUID()}`,
      surname: "The user's surname",
      phone: "(99) 9000-0000",
    });
  });

  afterAll(async () => {
    await system.stop();
  });

  it("should create an user session successfully", async () => {
    const sut = createUserSessionClient();

    const sessionCreatedResult = await sut(credentials);

    expect(sessionCreatedResult.status).toEqual(HttpStatus.created);
    expect(sessionCreatedResult.body.token).toBeDefined();
    expect(sessionCreatedResult.body.userId).toBeDefined();
  });

  describe("user credentials validation", () => {
    it("should check if the user exists", async () => {
      const sut = createUserSessionClient();

      const sessionCreatedResult = await sut({
        ...credentials,
        email: `user+${randomUUID()}@email.com`,
      });

      expect(sessionCreatedResult.status).toEqual(HttpStatus.unauthorized);
    });

    it("should check if the user's password match", async () => {
      const sut = createUserSessionClient();

      const sessionCreatedResult = await sut({
        ...credentials,
        password: randomUUID(),
      });

      expect(sessionCreatedResult.status).toEqual(HttpStatus.unauthorized);
    });
  });
});
