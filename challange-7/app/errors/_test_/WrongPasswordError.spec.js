const WrongPasswordError = require("../WrongPasswordError");

describe("WrongPasswordError", () => {
  it("should have correct error details", () => {
    const wrongPasswordError = new WrongPasswordError();

    expect(wrongPasswordError).toMatchObject({
      message: "Password is not correct!",
      name: "Error",
      details: {},
    });

    expect(wrongPasswordError.toJSON()).toEqual({
      error: {
        name: "Error",
        message: "Password is not correct!",
        details: {},
      },
    });
  });
});
