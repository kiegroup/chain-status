const { ClientError } = require("../../src/lib/common");
const { getOwnerProject } = require("../../src/utils/project-utils");

describe("get owner project", () => {
  test("valid project", () => {
    expect(getOwnerProject("kiegroup/chain-status")).toEqual({
      owner: "kiegroup",
      repo: "chain-status"
    });
  });

  test("invalid project", () => {
    expect(() => getOwnerProject("kiegroup-chain-status")).toThrow(
      new ClientError(
        "project kiegroup-chain-status does not match with the expected format owner/repo"
      )
    );
  });
});
