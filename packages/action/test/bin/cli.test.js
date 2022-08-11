const { start } = require("../../src/bin/cli");
const { getArgumentsObject } = require("../../src/bin/arguments");
jest.mock("../../src/bin/arguments");
const { main } = require("../../src/bin/main");
jest.mock("../../src/bin/main");

const empty_args = {
  createdBy: undefined,
  createdUrl: undefined,
  definitionFile: undefined,
  projects: [],
  debug: false,
  baseBranchFilter: [],
  projectFilter: []
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("main", () => {
  test("no inputs", () => {
    // Mock
    getArgumentsObject.mockReturnValueOnce(empty_args);

    // Act
    start();

    // Assert
    expect(main).toBeCalledTimes(1);
    expect(main).toHaveBeenCalledWith(
      expect.objectContaining({
        createdBy: undefined,
        createdUrl: undefined,
        definitionFile: undefined,
        projects: [],
        debug: false,
        baseBranchFilter: [],
        projectFilter: []
      })
    );
  });

  test("definition-file input", () => {
    // Mock
    getArgumentsObject.mockReturnValueOnce({
      ...empty_args,
      ...{ definitionFile: "definition-file" }
    });

    // Act
    start();

    // Assert
    expect(main).toBeCalledTimes(1);
    expect(main).toHaveBeenCalledWith(
      expect.objectContaining({
        definitionFile: "definition-file",
        projects: []
      })
    );
  });

  test("projects input", () => {
    // Mock
    getArgumentsObject.mockReturnValueOnce({
      ...empty_args,
      ...{ projects: ["project1", "project2", "project3"] }
    });

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
