<h1>How to Contribute</h1>

First, thank you for your input!

Before you begin, please check existing [GitHub Issues](https://github.com/Nerdware-LLC/fixit-web/issues) and [Pull Requests](https://github.com/Nerdware-LLC/fixit-web/pulls) to see if your idea is already in the pipeline. If not, consider [creating an issue](https://github.com/Nerdware-LLC/fixit-web/issues/new/choose), or sending an email to [trevor@nerdware.cloud](mailto:trevor@nerdware.cloud) before submitting your change.

- [Getting Started](#getting-started)
- [Project Layout](#project-layout)
- [Commit Messages](#commit-messages)
- [Release Process](#release-process)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Getting Started

This project uses [GitHub Flow](https://guides.github.com/introduction/flow/), so all changes happen through pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Submit that pull request!

## Project Layout

- [`.github/`](/.github) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; GitHub Actions and other GitHub-related files
- [`.storybook/`](/.storybook) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Storybook configs and decorators
- [`fixit@current.graphql`](/fixit%40current.graphql) &nbsp; &nbsp; The Fixit API GraphQL schema
- [`public/`](/public) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; App manifest, favicon, and other dist files
- [`src/`](/src) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Source code root dir
  - [`src/app/`](/src/app) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;High-level app structure and features
  - [`src/components/`](/src/components) &nbsp; &nbsp; &nbsp; &nbsp;Reusable JSX components
  - [`src/graphql/`](/src/config) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; GraphQL queries and mutations
  - [`src/hooks/`](/src/config) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Reusable React hooks
  - [`src/images/`](/src/images) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; In-app image assets (included with build bundle)
  - [`src/layouts/`](/src/config) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Reusable page layout components
  - [`src/pages/`](/src/pages) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Application pages (nav targets)
  - [`src/routes/`](/src/routers) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Routers and other nav-related components
  - [`src/services/`](/src/services) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;HTTP handlers for the Fixit and Stripe APIs
  - [`src/stores/`](/src/types) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [Apollo Reactive vars](https://www.apollographql.com/docs/react/local-state/reactive-variables/) and other state stores
  - [`src/tests/`](/src/types) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Test setup and mocks
  - [`src/types/`](/src/types) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Ambient typedefs and shared types
  - [`src/utils/`](/src/utils) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Helper functions for formatting, logging, etc.

## Commit Messages

Contributions to this project must use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages, as they are an integral part of this project's CI/CD automation. Commit messages are parsed by [Semantic Release](https://github.com/semantic-release/semantic-release#readme), integrated into the [changelog](./CHANGELOG.md), and included in the [release](#release-process) notes.

## Release Process

This project uses [Semantic Release](https://github.com/semantic-release/semantic-release#readme) to automate the following components of the release process:

- [GitHub releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) are automatically created based on the commit history since the last release.
- The [changelog](./CHANGELOG.md) is updated automatically based on the commit history since the last release.
- Git tags and the `"version"` specified in the [package.json](./package.json) are automatically updated based on the commit history since the last release.

> **_Do not touch (please):_ 👉👈🚫** <!-- No touchie!🦙 -->
>
> - The [CHANGELOG.md](./CHANGELOG.md)
> - The `"version"` field in [package.json](./package.json)
> - Git tags
>
> The robot minions work hard to manage these - **_please don't upset them_** 🤖

Once tests are passing on your pull request, and it has been approved by a maintainer, it will be merged into the `next` branch, which will trigger a versioned pre-release. After final review and approval of the pre-release build, a maintainer will merge `next` into `main`, which will trigger a release build of the package to be published to [npm](https://www.npmjs.com/package/fixit-web).

## Code of Conduct

All contributors are required to adhere to the [code of conduct](./CODE_OF_CONDUCT.md) in all interactions with this project.

## License

All code contributions from non-owner contributors shall be made using the [MIT](https://opensource.org/licenses/MIT) license.
