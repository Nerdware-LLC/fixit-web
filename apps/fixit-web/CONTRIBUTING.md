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

| Dir                                             | Purpose                                                           |
| :---------------------------------------------- | :---------------------------------------------------------------- |
| [**`.github/`**](/.github)                      | GitHub Actions workflows and other GitHub-related files           |
| [**`.storybook/`**](/.storybook)                | Storybook configs and decorators                                  |
| [**`public/`**](/public)                        | App manifest, favicon, and other dist files                       |
| [**`src/`**](/src)                              | Source code                                                       |
| &emsp; [**`src/app/`**](/src/app)               | High-level app structure and features                             |
| &emsp; [**`src/components/`**](/src/components) | Reusable JSX components                                           |
| &emsp; [**`src/graphql/`**](/src/graphql)       | GraphQL queries and mutations                                     |
| &emsp; [**`src/hooks/`**](/src/hooks)           | Reusable React hooks                                              |
| &emsp; [**`src/images/`**](/src/images)         | In-app image assets                                               |
| &emsp; [**`src/layouts/`**](/src/layouts)       | Reusable page layout components                                   |
| &emsp; [**`src/pages/`**](/src/pages)           | Application pages                                                 |
| &emsp; [**`src/routes/`**](/src/routes)         | Routing-related components, constants, and utils                  |
| &emsp; [**`src/services/`**](/src/services)     | REST API service handlers                                         |
| &emsp; [**`src/stores/`**](/src/stores)         | [Apollo Reactive vars][reactive-vars-docs] and other state stores |
| &emsp; [**`src/tests/`**](/src/tests)           | Test setup and global mocks                                       |
| &emsp; [**`src/types/`**](/src/types)           | Ambient typedefs and shared types                                 |
| &emsp; [**`src/utils/`**](/src/utils)           | Helper functions for formatting, logging, etc.                    |

[reactive-vars-docs]: https://www.apollographql.com/docs/react/local-state/reactive-variables/

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

Once tests are passing on your pull request, and it has been approved by a maintainer, it will be merged into the `next` branch, which will trigger a versioned pre-release. After final review and approval of the pre-release build, a maintainer will merge `next` into `main`, which will trigger a release build.

## Code of Conduct

All contributors are required to adhere to the [code of conduct](./CODE_OF_CONDUCT.md) in all interactions with this project.

## License

All code contributions from non-owner contributors shall be made using the [MIT](https://opensource.org/licenses/MIT) license.
