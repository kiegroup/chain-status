const octokit = {
  paginate() {
    return Promise.resolve([
      { id: 1, name: "name1", state: "ok" },
      { id: 2, name: "nam2", state: "ok" },
      { id: 3, name: "name3", state: "ok" }
    ]);
  },
  repos: {
    get() {
      return {
        status: 200,
        data: {
          name: "droolsjbpm-build-bootstrap",
          description:
            "The build bootstrap contains the parent pom, guidelines and scripts for Drools, jBPM and OptaPlanner.",
          html_url: "https://github.com/kiegroup/droolsjbpm-build-bootstrap",
          updated_at: "2022-07-18T09:44:51Z",
          homepage: "http://www.kiegroup.org",
          language: "Shell",
          default_branch: "main",
          repo_url: "https://github.com/kiegroup/droolsjbpm-build-bootstrap",
          pulls_url:
            "https://api.github.com/repos/kiegroup/droolsjbpm-build-bootstrap/pulls{/number}"
        }
      };
    },
    listBranches() {
      return {
        status: 200,
        data: [{ name: "main" }, { name: "7.67.x" }]
      };
    }
  },
  pulls: {
    list() {
      return {
        status: 200,
        data: [
          {
            number: 2037,
            title: "Bump undertow-core from 2.2.15.Final to 2.2.19.Final",
            url: "https://api.github.com/repos/kiegroup/droolsjbpm-build-bootstrap/pulls/2037",
            html_url:
              "https://github.com/kiegroup/droolsjbpm-build-bootstrap/pull/2037",
            state: "open",
            labels: ["dependencies"],
            draft: false,
            requested_reviewers: [],
            created_at: "2022-08-18T19:10:38Z",
            updated_at: "2022-08-18T19:10:39Z",
            closed_at: null,
            merged_at: null,
            base: {
              ref: "main",
              sha: "feb103ffaa3304bea148c1bc4646f518b43b0077",
              label: "kiegroup:main",
              repo: {
                name: "droolsjbpm-build-bootstrap",
                description:
                  "The build bootstrap contains the parent pom, guidelines and scripts for Drools, jBPM and OptaPlanner.",
                html_url:
                  "https://github.com/kiegroup/droolsjbpm-build-bootstrap",
                updated_at: "2022-07-18T09:44:51Z",
                homepage: "http://www.kiegroup.org",
                language: "Shell",
                default_branch: "main",
                repo_url:
                  "https://github.com/kiegroup/droolsjbpm-build-bootstrap",
                pulls_url:
                  "https://api.github.com/repos/kiegroup/droolsjbpm-build-bootstrap/pulls{/number}"
              }
            },
            head: {
              ref: "dependabot/maven/io.undertow-undertow-core-2.2.19.Final",
              sha: "e90fefda6160ce3ba603c2e7d25758977625793a",
              label:
                "kiegroup:dependabot/maven/io.undertow-undertow-core-2.2.19.Final"
            },
            user: {
              login: "dependabot[bot]",
              avatar_url: "https://avatars.githubusercontent.com/in/29110?v=4",
              html_url: "https://github.com/apps/dependabot"
            }
          },
          {
            number: 2031,
            title: "DROOLS-7105 DMN upgrade to Antlr 4.10",
            url: "https://api.github.com/repos/kiegroup/droolsjbpm-build-bootstrap/pulls/2031",
            html_url:
              "https://github.com/kiegroup/droolsjbpm-build-bootstrap/pull/2031",
            state: "open",
            labels: [],
            draft: false,
            requested_reviewers: [
              {
                login: "baldimir",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/125682?v=4",
                html_url: "https://github.com/baldimir"
              },
              {
                login: "danielezonca",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/244607?v=4",
                html_url: "https://github.com/danielezonca"
              },
              {
                login: "pibizza",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/7407073?v=4",
                html_url: "https://github.com/pibizza"
              },
              {
                login: "hellowdan",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/22012223?v=4",
                html_url: "https://github.com/hellowdan"
              }
            ],
            created_at: "2022-08-16T17:07:57Z",
            updated_at: "2022-08-19T07:20:54Z",
            closed_at: null,
            merged_at: null,
            base: {
              ref: "main",
              sha: "247e1329fb8ab90f04ba01b769631bb7fe8672ee",
              label: "kiegroup:main"
            },
            head: {
              ref: "tarilabs-20220816-DROOLS-7105-7x",
              sha: "a4325db2804378b1be52792d75ad838a1ae958b0",
              label: "tarilabs:tarilabs-20220816-DROOLS-7105-7x"
            },
            user: {
              login: "tarilabs",
              avatar_url: "https://avatars.githubusercontent.com/u/1699252?v=4",
              html_url: "https://github.com/tarilabs"
            }
          }
        ]
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

module.exports = {
  octokit
};
