jest.mock("fs");
const { existsSync, lstatSync } = require("fs");
const { ClientError } = require("../../src/lib/common");
const { saveFiles } = require("../../src/utils/file.utils");

afterEach(() => {
  jest.clearAllMocks();
});

describe("save files", () => {
  test("not a directory output path", () => {
    existsSync.mockReturnValueOnce(true);
    lstatSync.mockReturnValueOnce({
      isDirectory() {
        return false;
      }
    });

    expect(() => saveFiles("data", "/tmp/file.json")).toThrow(
      new ClientError("/tmp/file.json is not a directory.")
    );
  });

  test("new directory", () => {
    existsSync.mockReturnValueOnce(false);
    lstatSync.mockReturnValueOnce({
      isDirectory() {
        return true;
      }
    });

    saveFiles("data", "/tmp/newdir");
  });
});
