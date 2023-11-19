// Optimized code
const EmailNotRegisteredError = require("../EmailNotRegisteredError");

describe("EmailNotRegisteredError", () => {
  it("should have correct error details", () => {
    const email = "test@example.com";
    const emailNotRegisteredError = new EmailNotRegisteredError(email);

    // Check error properties
    expect(emailNotRegisteredError).toMatchObject({
      message: `${email} is not registered!`,
      name: "Error",
      details: { email: email },
    });

    // Check JSON representation
    expect(emailNotRegisteredError.toJSON()).toEqual({
      error: {
        name: "Error",
        message: `${email} is not registered!`,
        details: { email: email },
      },
    });
  });
});
