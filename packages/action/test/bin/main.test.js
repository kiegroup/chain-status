const fs = require("fs");
jest.mock("fs");
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
  test("branching github flow", () => {
    // since args.jenkinsUrl is undefined we will go in the github flow
    main({ ...defaultArgs });
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

  test("append new project status", () => {
    // simulate a product.json file already exists
    fs.existsSync.mockReturnValueOnce(true);
    fs.readFileSync.mockReturnValueOnce(
      '{"projectStatuses": [{"id": "kiegroup-status", "name": "Kiegroup Status","folder": "kiegroup-status","date": 1660748832737}]}'
    );

    main({ ...defaultArgs });

    // expectations
    expect(executeGithub).toBeCalledTimes(1);
    // expect(fs.existsSync).toBeCalledTimes(1);
    // expect(fs.readFileSync).toBeCalledTimes(1);
  });
});

describe("jenkins main", () => {
  test("", () => {
    // since args.jenkinsUrl is not undefined we will go in the jenkins flow
    main({
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
    // expect(fs.existsSync).toBeCalledTimes(1);
    // expect(fs.readFileSync).toBeCalledTimes(0);
  });
});
