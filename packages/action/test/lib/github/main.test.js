jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
  lstatSync: jest.fn().mockReturnValue({
    isDirectory() {
      return true;
    }
  })
}));
jest.mock("../../../src/utils/bin-utils");
const { readFileSync } = jest.requireActual("fs");
const { main } = require("../../../src/lib/github/main");
const { createOctokitInstance } = require("../../../src/utils/bin-utils");
const { octokit } = require("../../support/mock-octokit");

const mockDate = new Date(1466424490000);
const spy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

afterAll(() => {
  spy.mockRestore();
});

beforeEach(() => {
  createOctokitInstance.mockReturnValueOnce(octokit);
});

afterEach(() => {
  jest.clearAllMocks();
});

const defaultArgs = {
  title: "Chain Status",
  subtitle: "Chain Status pull requests statuses",
  token: "github-token",
  definitionFile: __dirname + "/../../support/definition-file.yaml",
  projectFilter: ["droolsjbpm-build-bootstrap"],
  baseBranchFilter: ["main"]
};

const defaultMetadata = {
  title: "Chain Status",
  subtitle: "Chain Status pull requests statuses",
  createdBy: "@kie/chain-status",
  createdUrl: undefined
};

describe("github main", () => {
  test("running github main properly", async () => {
    await main(defaultArgs, "/tmp/chain-status/", defaultMetadata, 1000, true);

    // test writeFileSync
  });
});
