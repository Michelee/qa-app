import { addDelay } from "./addDelay";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("Add delay test", () => {
  test("waits 5 seconds", () => {
    addDelay();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });
});
