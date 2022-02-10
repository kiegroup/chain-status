const { start } = require("../../src/bin/github-action");
const { getInput } = require("@actions/core");
jest.mock("@actions/core");
const { main } = require("../../src/bin/main");
jest.mock("../../src/bin/main");

afterEach(() => {
  jest.clearAllMocks();
});

describe("main", () => {
  test("no inputs", () => {
    // Act
    start();

    // Assert
    expect(main).toBeCalledTimes(1);
    expect(main).toHaveBeenCalledWith(
      expect.objectContaining({
        createdBy: "TODO",
        definitionFile: undefined,
        debug: false,
        baseBranchFilter: []
      })
    );
  });

  test("definition-file input", () => {
    // Arrange
    getInput.mockReturnValueOnce("definition-file");

    // Act
    start();

    // Assert
    expect(main).toBeCalledTimes(1);
    expect(main).toHaveBeenCalledWith(
      expect.objectContaining({
        definitionFile: "definition-file"
      })
    );
  });
});
