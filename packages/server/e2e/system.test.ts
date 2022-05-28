/**
 * @jest-environment ./prisma-test-environment.ts
 */

import { system } from "~/system";

function makeSut() {
  const start = jest.fn();
  const stop = jest.fn();

  system.start = start;
  system.stop = stop;

  return {
    sut: system,
    start,
    stop,
  };
}

describe("System Test", () => {
  it("should invoke start and stop", async () => {
    const { sut, start, stop } = makeSut();

    await sut.start();

    expect(start).toBeCalledTimes(1);

    await sut.stop();

    expect(stop).toBeCalledTimes(1);
  });
});
