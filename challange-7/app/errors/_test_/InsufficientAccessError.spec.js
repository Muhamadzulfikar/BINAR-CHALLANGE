// Optimized code
const InsufficientAccessError = require("../InsufficientAccessError");

describe("InsufficientAccessError", () => {
  it("should have correct role", () => {
    const role = "user";
    const insufficientAccessError = new InsufficientAccessError(role);

    // Check error properties
    expect(insufficientAccessError).toMatchObject({
      message: "Access forbidden!",
      name: "Error",
      details: {
        role: role,
        reason: `${role} is not allowed to perform this operation.`,
      },
    });

    // Check JSON representation
    expect(insufficientAccessError.toJSON()).toEqual({
      error: {
        name: "Error",
        message: "Access forbidden!",
        details: {
          role: role,
          reason: `${role} is not allowed to perform this operation.`,
        },
      },
    });
  });
});
