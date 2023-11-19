const ApplicationError = require("../ApplicationError");

describe("ApplicationError", () => {
  const createTestError = () => new ApplicationError("TestError");

  it("should return JSON representation with default details", () => {
    const applicationError = createTestError();
    const jsonRepresentation = applicationError.toJSON();
    expect(jsonRepresentation).toEqual({
      error: {
        name: "Error",
        message: "TestError",
        details: {},
      },
    });
  });

  it("should return an empty object for the details getter", () => {
    const applicationError = createTestError();
    const details = applicationError.details;
    expect(details).toEqual({});
  });
});
