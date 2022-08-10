# Chain Status tool

JS tool + React web application called chain-status that allows us to centralize, expose, consume and filter information about Github Pull Requests and Jenkins jobs status as a web page resource.
The JS tool basically consumes information from Github API or Jenkins API and generates a JSON file which is retrieved by the React web application. 

The best part here is everybody can easily use it for their projects, no additional source code is required and we are using external and free resources (like Github API jobs and Github Pages).

## Working examples

If you want to learn this tool directly from concrete, working examples we suggest to take a look at [droolsjbpm-build-bootstrap](https://github.com/kiegroup/droolsjbpm-build-bootstrap) project. This project integrates the `chain-status` tool as Github workflows in order to provide a [Kiegroup status](https://kiegroup.github.io/droolsjbpm-build-bootstrap/status/kiegroup-status) page that is continuously updated in an automated way.

### Examples

1. [droolsjbpm-build-bootstrap](https://github.com/kiegroup/droolsjbpm-build-bootstrap), a working and complete example of a real application.
2. [chain-status-example](https://github.com/lampajr/chain-status-example), a step by step simple example of how to integrate the tool.
## Technical information

It is multipackage npm project. We recommend to use yarn, since just yarn.lock files are provided.

### Available Scripts

In the project directory, you can run:

#### 
#### `yarn`

To install the libraries

#### 
#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Actions

This project provides a set of actions that can be referenced by external projects workflows that aims to automate the Github page and content generation.

### Generate App

The **generate-app** action, the definition of which can be found [here](https://github.com/kiegroup/chain-status/blob/main/.ci/actions/generate-app/action.yml), is in charge to create the webpage that will be hosted at `https://<your-account>.github.io/<repository>/`.

#### Action Steps
Here the main important steps performed by **generate-app** action:

1. Checkout in the branch where you want to store the webpage code and content, the default is `gh-pages`. [the first time you run this action there will be no webpage]
2. Checkout in the original [chain-status](https://github.com/kiegroup/chain-status) repository, i.e., this one.
3. Setup nodejs and build the webpage using `yarn`.
4. Check if in the target branch (e.g., `gh-pages`) there are old content/configuration files by checking the `data/` folder. If there exists, it copies its content under the newly compiled webpage (under `./packages/webpage/public/`).
5. Deploy the created page using [gh-pages](https://www.npmjs.com/package/gh-pages) tool in the target branch (e.g., `gh-pages`).


#### Inputs

| Field           | Required | Default  | Description                                                          |
|-----------------|----------|----------|----------------------------------------------------------------------|
| github-token    | true     |          | The Github token that must be used to interact with Github API       |
| info-md-url     | true     |          | The url pointing to a Markdown file used to populate info section    |
| gh-pages-branch | false    | gh-pages | The branch used by `gh-pages` tool, where the webpage will be stored |

### Generate Data

The **generate-data** [action](https://github.com/kiegroup/chain-status/blob/main/.ci/actions/generate-data/action.yml) is in charge to create and store the content that is then fetched by the webpage. It stores all needed information in the `data/` folder.

#### Action Steps
Here the main important steps performed by **generate-data** action:

1. Checkout in the branch where you want to store the webpage code and content, the default is `gh-pages`.
2. Execute the [chain-status](https://github.com/kiegroup/chain-status/tree/main/packages/action) tool that, given a set of inputs, compute the configuration files and all the contents that are used by the webpage.
3. Commit and push the newly generated data in the target branch (e.g., `gh-pages`).

#### Inputs

| Field              | Required | Default             | Description                                                                                                                                                                                      |
|--------------------|----------|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| github-token       | true     |                     | The Github token that must be used to interact with Github API                                                                                                                                   |
| definition-file    | true     |                     | The file containing all projects for which you want to provide the status, an [example](https://raw.githubusercontent.com/kiegroup/droolsjbpm-build-bootstrap/main/.ci/pull-request-config.yaml) - more infos [here](https://github.com/kiegroup/build-chain-configuration-reader) |
| title              | false    | Project status      | The project/webapp title                                                                                                                                                                         |
| subtitle           | false    | Contribution status | The project/webapp subtitle                                                                                                                                                                      |
| base-branch-filter | false    |                     | A comma separated list of base branches RegEx to be filtered. Like `main,7.59.x,8.x` or `main,^7.*`                                                                                              |
| project-filter     | false    |                     | A comma separated list of project RegEx to be filtered. Like `drools,opta.*` or `jbpm,^drools.*`                                                                                                 |
| created-by         | false    | github action       | The user/machine/whatever that regenerates the report                                                                                                                                            |
| created-url        | false    |                     | Normally the job generating the info URL                                                                                                                                                         |
| logger-level       | false    | info                | The log level. 'info' (default) \| 'trace' \| 'debug'                                                                                                                                            |
| gh-pages-branch    | false    | gh-pages            | The branch used by `gh-pages` tool, where the webpage will be stored                                                                                                                             |

## Usage


Since this project is already providing configurable actions (more details in [actions](#actions) section), if you want to use this tool - in order to automate the Github page generation for project statuses - you will only have to add two specific workflows to your target project and configure it as you prefer.

### Prerequisites 

In order to properly use this tool you have to accomplish the following prerequisites:
- Add Github token to you account, more information on how to do it [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
- Add default personal Github page repository (`<profile/org>.github.io`), more information [here](https://docs.github.com/en/pages/quickstart).

### Workflows Configuration

Here the steps you should follow to integrate your project with **chain-status** tool:

1. Create a new Github workflow for the webpage generation.
    - Create a new file in `.github/workflows/generate_status_page.yaml` (you can use whatever name you prefer)
    - Copy the following content in the file
    ```yaml
    name: Generate status page
    on: workflow_dispatch

    jobs:
      generate-status-page:
        if: github.repository_owner == '<OWNER>'
        concurrency:
          group: generate-status-page
          cancel-in-progress: true
        strategy:
          matrix:
            os: [ubuntu-latest]
          fail-fast: true
        runs-on: ubuntu-latest
        name: Generate status page
        steps:
          - name: Generate status page
            uses: kiegroup/chain-status/.ci/actions/generate-app@main
            with:
              info-md-url: "<PATH-TO-INFO>"
              github-token: "${{ secrets.GITHUB_TOKEN }}"
    ```
    - Change some input fields in according to your projects, for instance `OWNER` must be the owner of the project where you are adding this workflow.

2. Create a new Github workflow for the report/data generation.
    - Create a new file in .github/workflows/generate_status_page_data.yaml (you can use whatever name you prefer)
    - Copy the following content in the new workflow
    ```yaml
    name: Generate status page data

    on:
      workflow_dispatch:
      schedule:
        - cron: '0 * * * *'
    jobs:
      generate-status-page-data:
        if: github.repository_owner == '<OWNER>'
        concurrency:
          group: generate-status-page-data
          cancel-in-progress: true
        strategy:
          matrix:
            os: [ubuntu-latest]
          fail-fast: true
        runs-on: ubuntu-latest
        name: Generate status page data
        steps:
          - name: Generate status page data
            uses: kiegroup/chain-status/.ci/actions/generate-data@main
            with:
              definition-file: https://raw.githubusercontent.com/kiegroup/droolsjbpm-build-bootstrap/main/.ci/pull-request-config.yaml
              title: <TITLE>
              subtitle: <SUBTITLE>
              base-branch-filter: <BRANCH-LIST>
              created-by: Github Action
              created-url: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
              logger-level: debug
              github-token: "${{ secrets.GITHUB_TOKEN }}"
    ```
    - Replace `<..>` data with your project-specific one, for further details about fields usage see [Generate Data](#Generate-Data) action.
    - [Optional] Include `schedule` option only if you aim to automatically tun the Github action periodically - this is recommended if you want to have the status data always up to date.
    
3. Once both workflows have been created I recommend running first the content generation one (`generate_status_page_data`), such that the projects configuration that you want to use is already present when you create the webpage content (using the `generate_status_page` workflow).
