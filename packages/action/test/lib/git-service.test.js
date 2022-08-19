const { ClientError } = require("../../src/lib/common");
const {
  getDefaultBranch,
  getRepository,
  getPullRequests,
  getChecks
  // getRefStatuses,
  // listBranches
} = require("../../src/lib/git-service");

const mockOctokitOk = {
  repos: {
    get() {
      return {
        status: 200,
        data: {
          default_branch: "main"
        }
      };
    }
  },
  pulls: {
    list() {
      return {
        status: 200,
        data: [{ data: "content" }, { data: "content2" }]
      };
    }
  },
  checks: {
    listForRef() {
      return {
        status: 200,
        data: {
          check_runs: [{ data: "content" }, { data: "content2" }]
        }
      };
    }
  }
};

const mockOctokitKo = {
  repos: {
    get() {
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
      getDefaultBranch("kiegroup/chain-status", mockOctokitOk)
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
      getRepository("kiegroup/chain-status", mockOctokitOk)
    ).resolves.toEqual({
      default_branch: "main"
    });
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
    const result = await getPullRequests(
      "kiegroup/chain-status",
      mockOctokitOk
    );
    expect(result.length).toEqual(2);
    expect(result).toEqual(
      expect.arrayContaining([{ data: "content" }, { data: "content2" }])
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
    const result = await getChecks(
      "kiegroup/chain-status",
      "ref",
      mockOctokitOk
    );
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
