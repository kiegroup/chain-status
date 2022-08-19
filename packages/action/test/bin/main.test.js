jest.mock("fs");
const { existsSync, readFileSync, writeFileSync } = require("fs");
const { main } = require("../../src/bin/main");
const { main: executeGithub } = require("../../src/lib/github/main");
jest.mock("../../src/lib/github/main");
const { main: executeJenkins } = require("../../src/lib/jenkins/main");
jest.mock("../../src/lib/jenkins/main");

afterEach(() => {
  jest.clearAllMocks();
});

const defaultArgs = {
  title: "Title",
  subtitle: "Subtitle",
  outputFolderPath: "/tmp/",
  debug: true,
  jenkinsUrl: undefined
};

describe("github main", () => {
  test("branching github flow", async () => {
    // since args.jenkinsUrl is undefined we will go in the github flow
    await main({ ...defaultArgs });
    expect(executeJenkins).toBeCalledTimes(0);

    expect(executeGithub).toBeCalledTimes(1);
    expect(executeGithub).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Title"
      }),
      "/tmp/title",
      expect.objectContaining({
        title: "Title",
        subtitle: "Subtitle",
        createdBy: undefined,
        createdUrl: undefined
      }),
      undefined,
      true
    );
  });

  test("append new project status", async () => {
    // simulate a product.json file already exists
    existsSync.mockReturnValueOnce(true);
    readFileSync.mockReturnValueOnce(
      '{"projectStatuses": [{"id": "kiegroup-status", "name": "Kiegroup Status","folder": "kiegroup-status","date": 1660748832737}]}'
    );

    await main({ ...defaultArgs });

    expect(executeGithub).toBeCalledTimes(1);
    expect(writeFileSync).toBeCalledTimes(1);
    // TODO: fix
    // expect(writeFileSync).toHaveBeenCalledWith(
    //   "/tmp/product.json",
    //   JSON.stringify({
    //     projectStatuses: [
    //       {
    //         id: "kiegroup-status",
    //         name: "Kiegroup Status",
    //         folder: "kiegroup-status",
    //         date: 1660748832737
    //       },
    //       {
    //         id: "title",
    //         name: "Title",
    //         folder: "title",
    //         date: 1660915702755
    //       }
    //     ]
    //   }, null, 4)
    // );
  });
});

describe("jenkins main", () => {
  test("", async () => {
    // since args.jenkinsUrl is not undefined we will go in the jenkins flow
    await main({
      ...defaultArgs,
      ...{
        jenkinsUrl: "jenkins-url",
        jobUrl: "job-url",
        certFilePath: "cert-file-path"
      }
    });
    expect(executeGithub).toBeCalledTimes(0);

    expect(executeJenkins).toBeCalledTimes(1);
    expect(executeJenkins).toHaveBeenCalledWith(
      "jenkins-url",
      "job-url",
      undefined,
      "cert-file-path",
      "/tmp/title",
      expect.objectContaining({
        title: "Title",
        subtitle: "Subtitle",
        createdBy: undefined,
        createdUrl: undefined
      }),
      undefined,
      true
    );
    expect(existsSync).toBeCalledTimes(1);
    expect(readFileSync).toBeCalledTimes(0);
  });
});
