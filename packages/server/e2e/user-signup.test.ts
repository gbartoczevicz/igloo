/**
 * @jest-environment ./prisma-test-environment.ts
 */

import { system } from "~/system";
import { randomUUID } from "crypto";
import fetch from "node-fetch";
import { HttpStatus } from "~/contracts/http";

function makeSut() {
  const uuid = randomUUID();

  const user = {
    name: `A user ${uuid}`,
    surname: "The user's surname",
    email: `user+${uuid}@email.com`,
    phone: "(00) 00000-0000",
    password: uuid,
  };

  const sut = async (body: any) => {
    const response = await fetch("http://localhost:3333/users", {
      method: "POST",
      body,
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

    console.log(result);

    expect(result.status).toEqual(HttpStatus.created);
    expect(result.json).toEqual(user);
  });
});
