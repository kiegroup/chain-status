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
    },
    compareCommitsWithBasehead() {
      return {
        status: 200,
        data: {
          url: "https://api.github.com/repos/kiegroup/optaplanner/compare/main...8.29.x",
          html_url:
            "https://github.com/kiegroup/optaplanner/compare/main...8.29.x",
          permalink_url:
            "https://github.com/kiegroup/optaplanner/compare/kiegroup:985ccac...kiegroup:40382e9",
          files: [
            {
              sha: "04149c58bdbfdd98bd96e59e274443e8a9492143",
              filename: ".ci/jenkins/Jenkinsfile.prod.nightly",
              status: "modified",
              additions: 1,
              deletions: 1,
              changes: 2,
              blob_url:
                "https://github.com/kiegroup/optaplanner/blob/40382e92fa314ce9d6c6a691a4d3b387501882d9/.ci%2Fjenkins%2FJenkinsfile.prod.nightly",
              raw_url:
                "https://github.com/kiegroup/optaplanner/raw/40382e92fa314ce9d6c6a691a4d3b387501882d9/.ci%2Fjenkins%2FJenkinsfile.prod.nightly",
              contents_url:
                "https://api.github.com/repos/kiegroup/optaplanner/contents/.ci%2Fjenkins%2FJenkinsfile.prod.nightly?ref=40382e92fa314ce9d6c6a691a4d3b387501882d9",
              patch:
                "@@ -103,7 +103,7 @@ pipeline {\n                         echo '[INFO] Sending RHBOP UMB message to QE.'\n                         def PME_BUILD_VARIABLES = env.PME_BUILD_VARIABLES.split(';').collect{ it.split('=')}.inject([:]) {map, item -> map << [(item.length == 2 ? item[0] : null): (item.length == 2 ? item[1] : null)]}\n \n-                        def optaplannerArchiveUrl = \"https://bxms-qe.rhev-ci-vms.eng.rdu2.redhat.com:8443/nexus/content/groups/rhbop-${getCurrentBranch()}-nightly/\"\n+                        def optaplannerArchiveUrl = \"https://${env.LOCAL_NEXUS_IP}:8443/nexus/content/groups/rhbop-${getCurrentBranch()}-nightly/\"\n                         def optaplannerSourcesFileUrl = \"${env.STAGING_SERVER_URL}rhbop/RHBOP-${PRODUCT_VERSION}.nightly/rhbop-${PRODUCT_VERSION}.redhat-${PME_BUILD_VARIABLES['datetimeSuffix']}-optaplanner-sources.zip\"\n                         def optaplannerQuickstartsSourcesFileUrl = \"${env.STAGING_SERVER_URL}rhbop/RHBOP-${PRODUCT_VERSION}.nightly/rhbop-${PRODUCT_VERSION}.redhat-${PME_BUILD_VARIABLES['datetimeSuffix']}-optaplanner-quickstarts-sources.zip\"\n "
            },
            {
              sha: "3ed6895536446a60a78903a79dd798635eb5815b",
              filename: ".ci/jenkins/config/branch.yaml",
              status: "modified",
              additions: 10,
              deletions: 9,
              changes: 19,
              blob_url:
                "https://github.com/kiegroup/optaplanner/blob/40382e92fa314ce9d6c6a691a4d3b387501882d9/.ci%2Fjenkins%2Fconfig%2Fbranch.yaml",
              raw_url:
                "https://github.com/kiegroup/optaplanner/raw/40382e92fa314ce9d6c6a691a4d3b387501882d9/.ci%2Fjenkins%2Fconfig%2Fbranch.yaml",
              contents_url:
                "https://api.github.com/repos/kiegroup/optaplanner/contents/.ci%2Fjenkins%2Fconfig%2Fbranch.yaml?ref=40382e92fa314ce9d6c6a691a4d3b387501882d9",
              patch:
                "@@ -1,20 +1,20 @@\n environment:\n   quarkus:\n     main:\n-      enabled: true\n+      enabled: false\n     branch:\n       enabled: true\n-      version: '2.13'\n+      version: '2.7'\n     lts:\n-      enabled: true\n+      enabled: false\n       version: '2.7'\n   native:\n-    enabled: true\n+    enabled: false\n   mandrel:\n     enabled: true\n-    builder_image: quay.io/quarkus/ubi-quarkus-mandrel:22.2-java11\n+    builder_image: quay.io/quarkus/ubi-quarkus-mandrel:21.3-java11\n   mandrel_lts:\n-    enabled: true\n+    enabled: false\n     builder_image: quay.io/quarkus/ubi-quarkus-mandrel:21.3-java11\n     quarkus_version: 2.7\n   runtimes_bdd:\n@@ -24,11 +24,12 @@ disable:\n   triggers: false\n repositories:\n - name: optaplanner\n-  branch: main\n+  branch: 8.29.x\n+  is_branch_config_repo: true\n - name: optaweb-vehicle-routing\n-  branch: main\n+  branch: 8.29.x\n - name: optaplanner-quickstarts\n-  branch: development\n+  branch: 8.29.x\n git:\n   author:\n     name: kiegroup"
            },
            {
              sha: "88123151e66d0baa61313f8ab143281203096169",
              filename: ".ci/jenkins/dsl/jobs.groovy",
              status: "modified",
              additions: 1,
              deletions: 0,
              changes: 1,
              blob_url:
                "https://github.com/kiegroup/optaplanner/blob/40382e92fa314ce9d6c6a691a4d3b387501882d9/.ci%2Fjenkins%2Fdsl%2Fjobs.groovy",
              raw_url:
                "https://github.com/kiegroup/optaplanner/raw/40382e92fa314ce9d6c6a691a4d3b387501882d9/.ci%2Fjenkins%2Fdsl%2Fjobs.groovy",
              contents_url:
                "https://api.github.com/repos/kiegroup/optaplanner/contents/.ci%2Fjenkins%2Fdsl%2Fjobs.groovy?ref=40382e92fa314ce9d6c6a691a4d3b387501882d9",
              patch:
                "@@ -205,6 +205,7 @@ if (Utils.isMainBranch(this)) {\n // Tools folder\n KogitoJobUtils.createQuarkusUpdateToolsJob(this, 'optaplanner', [\n   modules: [ 'optaplanner-build-parent' ],\n+  compare_deps_remote_poms: [ 'io.quarkus:quarkus-bom' ],\n   properties: [ 'version.io.quarkus' ],\n ])\n "
            }
          ]
        }
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
