# Project Status Web Page

This package contains the source code of React web application.

The look and feel of this web application mainly relies on the [Ant Design](https://ant.design/docs/react/introduce) React library, which provides a set of high quality components for building rich, interactive user interfaces.

## Local Development

If you want to build or contribute to this project you will probably need to build/run this web application locally, here few steps to follow:

1. Clone the repository
```bash
$ git clone git@github.com:kiegroup/chain-status.git
```

2. Install all libraries [run it in the project's root]
```bash
$ yarn
```

3. Run the application in development mode [run it in the `webpage` package]
```bash
$ yarn run
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
Keep in mind that the page will reload if you make edits on the source code.

4. Build the whole project [run it on the project's root]
```bash
$ yarn build
```

## Action Flow

If you want to install this web application on your repository in an automated way, this project comes with an easy to use [Github action](https://github.com/kiegroup/chain-status/blob/main/.ci/actions/generate-app/action.yml) that you can use on your Github workflows.


The **generate-app** action is in charge to checkout this project, build it using `yarn` and publish it on a specific branch of the repository is including it.

### Action Steps
Here the main important steps performed by **generate-app** action:

1. Checkout in the branch where you want to store the webpage code and content, the default is `gh-pages`. [the first time you run this action there will be no webpage]
2. Checkout in the original [chain-status](https://github.com/kiegroup/chain-status) repository, i.e., this one.
3. Setup nodejs and build the webpage using `yarn`.
4. Check if in the target branch (e.g., `gh-pages`) there are old content/configuration files by checking the `data/` folder. If there exists, it copies its content under the newly compiled webpage (under `./packages/webpage/public/`).
5. Deploy the created page using [gh-pages](https://www.npmjs.com/package/gh-pages) tool in the target branch (e.g., `gh-pages`).


### Inputs

| Field           | Required | Default  | Description                                                          |
|-----------------|----------|----------|----------------------------------------------------------------------|
| github-token    | true     |          | The Github token that must be used to interact with Github API       |
| info-md-url     | true     |          | The url pointing to a Markdown file used to populate info section    |
| gh-pages-branch | false    | gh-pages | The branch used by `gh-pages` tool, where the webpage will be stored |

## Technical Information

### Lazy loading

1. I use redux to handle states. sectionsShow specifically https://github.com/kiegroup/chain-status/blob/main/packages/webpage/src/service/layout.service.tsx#L43

2. Then section is only shown based on the state https://github.com/kiegroup/chain-status/blob/f891b11cfedfc8c10143a2c7f7c1d0afd5a7bc0f/packages/webpage/src/components/pullrequests/List.tsx#L21

3. and then the section is registered  on redux machinery based on the callback from https://github.com/kiegroup/chain-status/blob/f891b11cfedfc8c10143a2c7f7c1d0afd5a7bc0f/packages/webpage/src/components/shared/MenuSelection.tsx#L29 whenever the section is shown based on an observer with some extra margins https://github.com/kiegroup/chain-status/blob/4ac20d86fcec9d6f94879bef6f3ad614527b03a2/packages/webpage/src/components/shared/MenuSelection.tsx#L86