/**
 * @jest-environment ./prisma-test-environment.ts
 */

import { system } from "~/system";
import { randomUUID } from "crypto";
import { HttpStatus, Method } from "~/contracts/http";
import { createUserClient } from "./helpers/http-client";

const uuid = randomUUID();

const user = {
  name: `A user ${uuid}`,
  surname: "The user's surname",
  email: `user+${uuid}@email.com`,
  phone: "(99) 9000-0000",
  password: uuid,
};

describe("User sign-up tests", () => {
  beforeAll(async () => {
    await system.start();
  });

  afterAll(async () => {
    await system.stop();
  });

  it("should create an user successfully", async () => {
    const sut = createUserClient();

    const result = await sut(user);

    const { id, ...delegate } = result.body;
    const { password, ...userExpected } = user;

    expect(result.status).toEqual(HttpStatus.created);
    expect(id).toBeDefined();
    expect(delegate).toEqual(userExpected);
  });

  it("should validate if the e-mail is already in use", async () => {
    const sut = createUserClient();

    const result = await sut(user);

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(result.body.message).toEqual("E-mail is already in use");
  });

  it("should validate if the phone number is already in use", async () => {
    const sut = createUserClient();

    const { email, ...userDelegate } = user;

    const userToBeSent = {
      ...userDelegate,
      email: `user+${randomUUID()}@email.com`,
    };

    const result = await sut(userToBeSent);

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(result.body.message).toEqual("Phone is already in use");
  });

  it("should validate the request body", async () => {
    const sut = createUserClient();

    const result = await sut({});

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(JSON.stringify(result.body)).toContain(
      "Some of the sent fields are invalid",
    );
  });
});
