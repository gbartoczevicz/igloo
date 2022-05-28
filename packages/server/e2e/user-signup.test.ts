/**
 * @jest-environment ./prisma-test-environment.ts
 */

import { system } from "~/system";
import { randomUUID } from "crypto";
import fetch from "node-fetch";
import { HttpStatus } from "~/contracts/http";

const uuid = randomUUID();

function makeSut() {
  const user = {
    name: `A user ${uuid}`,
    surname: "The user's surname",
    email: `user+${uuid}@email.com`,
    phone: "(99) 9000-0000",
    password: uuid,
  };

  const sut = async (body: unknown) => {
    const response = await fetch("http://localhost:3333/users", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(body),
    });

    return {
      json: await response.json(),
      status: response.status,
    };
  };

  return {
    user,
    sut,
  };
}

describe("User sign-up tests", () => {
  beforeAll(async () => {
    await system.start();
  });

  afterAll(async () => {
    await system.stop();
  });

  it("should create an user successfully", async () => {
    const { sut, user } = makeSut();

    const result = await sut(user);

    const { id, ...delegate } = result.json;
    const { password, ...userExpected } = user;

    expect(result.status).toEqual(HttpStatus.created);
    expect(id).toBeDefined();
    expect(delegate).toEqual(userExpected);
  });

  it("should validate if the e-mail is already in use", async () => {
    const { sut, user } = makeSut();

    const result = await sut(user);

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(result.json.message).toEqual("E-mail is already in use");
  });

  it("should validate if the phone number is already in use", async () => {
    const { sut, user } = makeSut();

    const { email, ...userDelegate } = user;

    const userToBeSent = {
      ...userDelegate,
      email: `user+${randomUUID()}@email.com`,
    };

    const result = await sut(userToBeSent);

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(result.json.message).toEqual("Phone is already in use");
  });

  it("should validate the request body", async () => {
    const { sut } = makeSut();

    const result = await sut({});

    expect(result.status).toEqual(HttpStatus.unprocessableEntity);
    expect(JSON.stringify(result.json)).toContain(
      "Some of the sent fields are invalid",
    );
  });
});
