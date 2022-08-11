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
        createdBy: undefined,
        createdUrl: undefined,
        definitionFile: undefined,
        projects: undefined,
        debug: false,
        baseBranchFilter: [],
        projectFilter: []
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
        definitionFile: "definition-file",
        projects: undefined
      })
    );
  });

  test("projects input", () => {
    // Arrange
    getInput.mockReturnValueOnce(undefined);
    getInput.mockReturnValueOnce("project1,project2,project3");
    getInput.mockReturnValueOnce("project1,project2,project3");

    // Act
    start();

    // Assert
    expect(main).toBeCalledTimes(1);
    expect(main).toHaveBeenCalledWith(
      expect.objectContaining({
        definitionFile: undefined,
        projects: ["project1", "project2", "project3"]
      })
    );
  });
});
