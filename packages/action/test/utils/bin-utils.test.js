const { ClientError } = require("../../src/lib/common");
const { Octokit } = require("@octokit/rest");
jest.mock("@octokit/rest");
const {
  getProcessEnvVariable,
  createOctokitInstance
} = require("../../src/utils/bin-utils");

beforeEach(() => {
  // set env variable
  process.env["bin-utils-test"] = "value";
  process.env["bin-utils-test-empty"] = "";
});

afterEach(() => {
  jest.clearAllMocks();

  // remove env variable
  process.env["bin-utils-test"] = undefined;
});

describe("get process env variable", () => {
  test("mandatory variable present", () => {
    expect(getProcessEnvVariable("bin-utils-test", true)).toStrictEqual(
      "value"
    );
  });

  test("mandatory variable not found", () => {
    expect(() => getProcessEnvVariable("not-found", true)).toThrow(
      new ClientError("environment variable not-found not set!")
    );
  });

  test("mandatory empty variable", () => {
    expect(() => getProcessEnvVariable("bin-utils-test-empty", true)).toThrow(
      new ClientError("environment variable bin-utils-test-empty not set!")
    );
  });

  test("non mandatory variable present", () => {
    expect(getProcessEnvVariable("bin-utils-test", false)).toStrictEqual(
      "value"
    );
  });

  test("non mandatory variable not found", () => {
    expect(getProcessEnvVariable("not-found", false)).toStrictEqual(undefined);
  });
});

describe("github auth", () => {
  test("using token", () => {
    createOctokitInstance("token");

    expect(Octokit).toBeCalledWith(
      expect.objectContaining({
        auth: "token token",
        userAgent: "ginxo/chain-status"
      })
    );
  });

  test("without token", () => {
    createOctokitInstance(undefined);

    expect(Octokit).toBeCalledWith(
      expect.objectContaining({
        userAgent: "ginxo/chain-status"
      })
    );
  });
});
