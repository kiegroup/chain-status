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
const { ClientError } = require("../../../src/lib/common");
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

const defaultDefFileArgs = {
  title: "Chain Status",
  subtitle: "Chain Status pull requests statuses",
  token: "github-token",
  definitionFile: __dirname + "/../../support/definition-file.yaml",
  projectFilter: ["droolsjbpm-build-bootstrap"],
  baseBranchFilter: ["main"],
  branches: ["main", "8.29.x"]
};

const defaultProjectsArgs = {
  title: "Chain Status",
  subtitle: "Chain Status pull requests statuses",
  token: "github-token",
  projects: ["kiegroup/droolsjbpm-build-bootstrap", "kiegroup/drools"],
  projectFilter: ["droolsjbpm-build-bootstrap"],
  baseBranchFilter: ["main"],
  branches: ["main", "8.29.x"]
};

const defaultMetadata = {
  title: "Chain Status",
  subtitle: "Chain Status pull requests statuses",
  createdBy: "@kie/chain-status",
  createdUrl: undefined
};

describe("github main", () => {
  test("running with definition file", async () => {
    await main(
      defaultDefFileArgs,
      "/tmp/chain-status/",
      defaultMetadata,
      1000,
      true
    );

    // test writeFileSync
  });

  test("running with projects list", async () => {
    await main(
      defaultProjectsArgs,
      "/tmp/chain-status/",
      defaultMetadata,
      1000,
      true
    );

    // test writeFileSync
  });

  test("without definition file and projects list", async () => {
    expect(
      async () =>
        await main(
          { ...defaultDefFileArgs, definitionFile: undefined },
          "/tmp/chain-status/",
          defaultMetadata,
          1000,
          true
        )
    ).rejects.toThrow(
      new ClientError(
        "You must provide either `definition-file` or `projects` argument"
      )
    );
  });

  test("without empty projects after filtering", async () => {
    expect(
      async () =>
        await main(
          { ...defaultProjectsArgs, projectFilter: ["not-present-project"] },
          "/tmp/chain-status/",
          defaultMetadata,
          1000,
          true
        )
    ).rejects.toThrow(
      new ClientError("No projects left after applying the filter")
    );
  });

  test("with empty definition file", async () => {
    expect(
      async () =>
        await main(
          {
            ...defaultDefFileArgs,
            definitionFile:
              __dirname + "/../../support/empty-definition-file.yaml"
          },
          "/tmp/chain-status/",
          defaultMetadata,
          1000,
          true
        )
    ).rejects.toThrow(
      new ClientError(
        "No projects defined in either definition file or projects property"
      )
    );
  });
});
