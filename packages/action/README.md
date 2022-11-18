# Generate Data JS Tool

This package provides a NodeJS CLI tool which basically consumes information from Github API and/or Jenkins API and generates a JSON file which is retrieved by the [React web application](https://github.com/kiegroup/chain-status/tree/main/packages/webpage/README.md).

## Usage

This tool can be easy use as a NodeJS CLI tool or as a Github Action

### NodeJS CLI Usage

In order to use you just need to install all required libraries, build the project and run the automatically generated distribution file at `packages/action/dist/index.js`.

1. Install libraries [run it from the project's root]

```bash
$ yarn
```

2. Run the tool, this can be done either Command Line Interface approach (see [local dev](#local-execution) section) or using Github action (see [action flow](#action-flow) section)

### Inputs

In this section you can find overall list of inputs that you can or must provide to the tool, either using cli or using the Github workflow.

| Field              | Required | Default             | Description                                                                                                                                                                                                                                                                        |
| ------------------ | -------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| github-token       | true     |                     | The Github token that must be used to interact with Github API                                                                                                                                                                                                                     |
| definition-file    | true     |                     | The file containing all projects for which you want to provide the status, an [example](https://raw.githubusercontent.com/kiegroup/droolsjbpm-build-bootstrap/main/.ci/pull-request-config.yaml) - more infos [here](https://github.com/kiegroup/build-chain-configuration-reader) |
| title              | false    | Project status      | The project/webapp title                                                                                                                                                                                                                                                           |
| subtitle           | false    | Contribution status | The project/webapp subtitle                                                                                                                                                                                                                                                        |
| base-branch-filter | false    |                     | A comma separated list of base branches RegEx to be filtered. Like `main,7.59.x,8.x` or `main,^7.*`                                                                                                                                                                                |
| project-filter     | false    |                     | A comma separated list of project RegEx to be filtered. Like `drools,opta.*` or `jbpm,^drools.*`                                                                                                                                                                                   |
| created-by         | false    | github action       | The user/machine/whatever that regenerates the report                                                                                                                                                                                                                              |
| created-url        | false    |                     | Normally the job generating the info URL                                                                                                                                                                                                                                           |
| logger-level       | false    | info                | The log level. 'info' (default) \| 'trace' \| 'debug'                                                                                                                                                                                                                              |
| gh-pages-branch    | false    | gh-pages            | The branch used by `gh-pages` tool, where the webpage will be stored                                                                                                                                                                                                               |
| branches           | false    | []                  | The list of branches for which to provide branches comparison                                                                                                                                                                                                                      |

### Local Execution

In order to locally run this, you simply need to run the [cli tool](./src/bin/cli.js) providing at least all required arguments (more details in [inputs](#inputs) section)

Here an usage example:

```bash
$ node packages/action/src/bin/cli.js -t 'Title' -st 'Subtitle' --token <GH-TOKEN> -df https://raw.githubusercontent.com/kiegroup/kogito-pipelines/main/.ci/pull-request-config.yaml [-o <PATH-TO-REACT-WEBAPP-DATA>]
```

### Github Action Flow

This tool can be integrated in a Github action in order to automate the data generation process, for this purpose this project comes with an easy to use [Github action](https://github.com/kiegroup/chain-status/blob/main/.ci/actions/generate-data/action.yml) that you only need to use in your own Github workflows.

Here the main important steps performed by **generate-data** action:

1. Checkout in the branch where you want to store the webpage code and content, the default is `gh-pages`.
2. Execute the [chain-status](https://github.com/kiegroup/chain-status/tree/main/packages/action/dist/index.js) tool that, given a set of inputs, compute the configuration files and all the contents that are used by the webpage - this execution is performed using another [Github action](https://github.com/kiegroup/chain-status/blob/main/action.yml).
3. Commit and push the newly generated data in the target branch (e.g., `gh-pages`).
