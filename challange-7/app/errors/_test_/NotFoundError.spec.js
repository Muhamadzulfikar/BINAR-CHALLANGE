// Optimized code
const NotFoundError = require("../NotFoundError");

describe("NotFoundError", () => {
  it("should have correct error details", () => {
    const method = "GET";
    const url = "/example";
    const notFoundError = new NotFoundError(method, url);

    // Check error properties
    expect(notFoundError).toMatchObject({
      message: "Not found!",
      name: "Error",
      details: {
        method: method,
        url: url,
      },
    });

    // Check JSON representation
    expect(notFoundError.toJSON()).toEqual({
      error: {
        name: "Error",
        message: "Not found!",
        details: {
          method: method,
          url: url,
        },
      },
    });
  });
});
