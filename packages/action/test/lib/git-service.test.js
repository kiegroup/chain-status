const { ClientError } = require("../../src/lib/common");
const {
  getDefaultBranch,
  getRepository,
  getPullRequests,
  getChecks,
  getRefStatuses,
  listBranches
} = require("../../src/lib/git-service");
const { octokit } = require("../support/mock-octokit");

const mockOctokitKo = {
  repos: {
    get() {
      return {
        status: 400,
        data: "error"
      };
    },
    listBranches() {
      return {
        status: 400,
        data: "error"
      };
    }
  },
  pulls: {
    list() {
      return {
        status: 400,
        data: "error"
      };
    }
  },
  checks: {
    listForRef() {
      return {
        status: 400,
        data: "error"
      };
    }
  }
};

describe("get default branch", () => {
  test("valid request", () => {
    return expect(
      getDefaultBranch("kiegroup/chain-status", octokit)
    ).resolves.toEqual("main");
  });

  test("invalid request", () => {
    return expect(
      getDefaultBranch("kiegroup/chain-status", mockOctokitKo)
    ).rejects.toThrow(
      new ClientError(
        `Error requesting https://api.github.com/repos/kiegroup/chain-status`
      )
    );
  });
});

describe("get repository", () => {
  test("valid request", () => {
    return expect(
      getRepository("kiegroup/chain-status", octokit)
    ).resolves.toEqual(
      expect.objectContaining({
        default_branch: "main"
      })
    );
  });

  test("invalid request", () => {
    return expect(
      getRepository("kiegroup/chain-status", mockOctokitKo)
    ).rejects.toThrow(
      new ClientError(
        `Error requesting https://api.github.com/repos/kiegroup/chain-status`
      )
    );
  });
});

describe("get pull requests", () => {
  test("some pull requests received", async () => {
    const result = await getPullRequests("kiegroup/chain-status", octokit);
    expect(result.length).toEqual(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Bump undertow-core from 2.2.15.Final to 2.2.19.Final",
          url: "https://api.github.com/repos/kiegroup/droolsjbpm-build-bootstrap/pulls/2037"
        })
      ])
    );
  });

  test("empty list on ~200 status", async () => {
    const result = await getPullRequests(
      "kiegroup/chain-status",
      mockOctokitKo
    );
    expect(result.length).toEqual(0);
  });
});

describe("get checks", () => {
  test("check runs received", async () => {
    const result = await getChecks("kiegroup/chain-status", "ref", octokit);
    expect(result.length).toEqual(2);
    expect(result).toEqual(
      expect.arrayContaining([{ data: "content" }, { data: "content2" }])
    );
  });

  test("empty list on ~200 status", async () => {
    const result = await getChecks(
      "kiegroup/chain-status",
      "ref",
      mockOctokitKo
    );
    expect(result.length).toEqual(0);
  });
});

describe("get branches", () => {
  test("list of branches received", async () => {
    const result = await listBranches("kiegroup/chain-status", octokit);
    expect(result.length).toEqual(2);
    expect(result).toEqual(
      expect.arrayContaining([{ name: "main" }, { name: "7.67.x" }])
    );
  });

  test("empty list on ~200 status", async () => {
    const result = await listBranches("kiegroup/chain-status", mockOctokitKo);
    expect(result.length).toEqual(0);
  });
});

describe("get ref statuses", () => {
  test("ref statuses received", async () => {
    const result = await getRefStatuses(
      "kiegroup/chain-status",
      "ref",
      octokit
    );
    expect(result.length).toEqual(3);
    expect(result).toEqual(
      expect.arrayContaining([
        { id: 1, name: "name1", state: "ok" },
        { id: 2, name: "nam2", state: "ok" },
        { id: 3, name: "name3", state: "ok" }
      ])
    );
  });
});
