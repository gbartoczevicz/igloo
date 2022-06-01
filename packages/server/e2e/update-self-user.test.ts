/**
 * @jest-environment ./prisma-test-environment.ts
 */
import { system } from "~/system";
import { randomUUID } from "crypto";
import { HttpStatus } from "~/contracts/http";
import {
  createUpdateUserClient,
  createUserClient,
  createUserSessionClient,
} from "./helpers/http-client";

const user = {
  email: `user+${randomUUID()}@email.com`,
  password: randomUUID(),
  name: `A user ${randomUUID()}`,
  surname: "The user's surname",
  phone: "(99) 9000-0000",
};

const anotherUser = {
  email: `user+${randomUUID()}@email.com`,
  password: randomUUID(),
  name: `A user ${randomUUID()}`,
  surname: "The user's surname",
  phone: "(99) 8000-0000",
};

let userCreated: any = {};
let token: string | null = null;

describe("Update self user tests", () => {
  beforeAll(async () => {
    await system.start();

    const createUser = createUserClient();
    const userCreatedResult = await createUser(user);

    userCreated = { ...user, id: userCreatedResult.body.id };

    await createUser(anotherUser);

    const createUserSession = createUserSessionClient();
    const sessionCreatedResult = await createUserSession(user);

    token = sessionCreatedResult.body.token;
  });

  afterAll(async () => {
    await system.stop();
  });

  it("should update the current user successfully", async () => {
    const sut = createUpdateUserClient(token as string);

    const surname = randomUUID();

    const result = await sut({
      ...userCreated,
      surname,
    });

    const userUpdated = result.body;

    expect(result.status).toEqual(HttpStatus.ok);
    expect(userUpdated.id).toEqual(userCreated.id);
    expect(userUpdated.name).toEqual(userCreated.name);
    expect(userUpdated.surname).toEqual(surname);
    expect(userUpdated.email).toEqual(userCreated.email);
    expect(userUpdated.phone).toEqual(userCreated.phone);
  });

  it("should validate if the e-mail is already in use", async () => {
    const sut = createUpdateUserClient(token as string);

    const result = await sut({
      ...userCreated,
      email: anotherUser.email,
    });

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(result.body).toEqual({ message: "E-mail is already in use" });
  });

  it("should validate if the phone is already in use", async () => {
    const sut = createUpdateUserClient(token as string);

    const result = await sut({
      ...userCreated,
      phone: anotherUser.phone,
    });

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(result.body).toEqual({ message: "Phone is already in use" });
  });
});
