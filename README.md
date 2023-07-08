<div align="center">

  <a href="https://github.com/Nerdware-LLC/fixit-web" >
    <img src=".github/assets/fixit_web_repo_header.png" alt="Header with logo" height="135">
  </a>
  <h1></h1>

Author: [Trevor Anderson](https://github.com/trevor-anderson), Founder of [Nerdware](https://github.com/Nerdware-LLC)

[<img src="./.github/assets/powered_by_Stripe_blurple.svg" height="26" style="position:relative;top:3px;"/>](https://stripe.com/)
&nbsp;
[![react][react-shield]](https://reactjs.org/)
&nbsp;
[![pre-commit][pre-commit-shield]](https://github.com/pre-commit/pre-commit)
&nbsp;
[![semantic-release][semantic-shield]](https://github.com/semantic-release/semantic-release)
&nbsp;
[![code style: prettier][prettier-shield]](https://github.com/prettier/prettier)
&nbsp;
[![license][license-shield]](/LICENSE)

</div>
<br>

Fixit Web provides Fixit users with business-critical web interfaces that are each a crucial part of the user's journey, like the Stripe-powered [CheckoutPage](/src/pages/CheckoutPage/). Each page contained in this project connects one part of the user onboarding funnel to another.

- [🗺 Project Layout](#-project-layout)
- [☁️ Cloud Architecture](#️-cloud-architecture)
  - [End-User Delivery](#end-user-delivery)
- [💎 Premium SaaS Products](#-premium-saas-products)
- [📦 CI/CD Pipeline](#-cicd-pipeline)
  - [GitHub Actions](#github-actions)
  - [Codegen](#codegen)
- [📝 License](#-license)
- [💬 Contact](#-contact)

---

## 🗺 Project Layout

- [`__mocks__`](/__mocks__) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Mock npm modules for testing purposes.
- [`.github`](/.github) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; GitHub Actions and other GitHub-related files.
- [`fixit@current.graphql`](/fixit%40current.graphql) &nbsp; &nbsp; The Fixit API GraphQL schema.
- [`public`](/public) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; App manifest, favicon, and other dist files.
- [`src`](/src) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Source code root dir.
  - [`src/app`](/src/app) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; High-level app features and structure.
  - [`src/components`](/src/components) &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Reusable JSX components.
  - [`src/graphql`](/src/config) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; GraphQL queries and mutations.
  - [`src/hooks`](/src/config) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Reusable React hooks.
  - [`src/images`](/src/images) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; In-app image assets (included with build bundle).
  - [`src/layouts`](/src/config) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Reusable page layout components.
  - [`src/pages`](/src/pages) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Application pages (nav targets).
  - [`src/routers`](/src/routers) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Routers and other nav-related components.
  - [`src/services`](/src/services) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; HTTP handlers for the Fixit and Stripe APIs.
  - [`src/types`](/src/types) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Ambient typedefs and shared types.
  - [`src/utils`](/src/utils) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Helper functions for formatting, logging, etc.

## ☁️ Cloud Architecture

As with all Fixit cloud infrastructure, IaC files responsible for _defining_ and _implementing_ Fixit Web's cloud architecture/resources are split between two sibling repos:

- [**fixit-cloud-modules**](https://github.com/Nerdware-LLC/fixit-cloud-modules#readme) &nbsp; Terraform modules which _define_ Fixit Web's cloud.
- [**fixit-cloud-live**](https://github.com/Nerdware-LLC/fixit-cloud-live#readme) &nbsp;&nbsp;&nbsp; Terragrunt configs which _implement_ Fixit Web's cloud.

### End-User Delivery

Fixit Web is delivered to end users via the process outlined in the diagram below.

```mermaid
sequenceDiagram
    participant User as End User
    participant CF as CloudFront Cache
    participant S3 as S3 Bucket Origin
    autonumber
    %%{wrap}%%
    User->>CF: GET request
    Note over User,CF: CloudFront Trigger: Viewer Request
    alt if cache hit
        CF-->>User: Return cached content
        Note over CF,User: CloudFront Trigger: Viewer Response
    else if no cache hit
        CF->>S3: GET content from S3
        Note over CF,S3: CloudFront Trigger: Origin Request
        S3-->>CF: Return content
        Note over S3,CF: CloudFront Trigger: Origin Response<br> (Lambda fn updates CSP header)
        CF-->>User: Return content
        Note over CF,User: CloudFront Trigger: Viewer Response
    end
```

## 💎 Premium SaaS Products

The table below lists currently available Fixit SaaS products. Subscription management is powered by [Stripe](https://stripe.com/billing).

| Product                 | Purchase Option      | Price (USD) |                Promo Code(s) Available?                |
| :---------------------- | :------------------- | :---------: | :----------------------------------------------------: |
| Fixit SaaS Subscription | 14-Day Free Trial    |     $0      |                          N/A                           |
| Fixit SaaS Subscription | Monthly Subscription |  $5/month   | <span style="color:#66FF00;font-size:1.5rem;">✓</span> |
| Fixit SaaS Subscription | Annual Subscription  |  $50/year   | <span style="color:#66FF00;font-size:1.5rem;">✓</span> |

## 📦 CI/CD Pipeline

<!-- An outline of this process is below. -->

<!-- TODO Add screenshot image of pipeline_production workflow in action -->

### GitHub Actions

This project's CI/CD pipeline uses GitHub Actions to [test](/.github/workflows/test.yaml), [release](/.github/workflows/release.yaml), and [deploy](/.github/workflows/deploy.yaml) staging and production environments. Both environments are associated with a protected Git branch:

| Environment | Git Branch | Permits `git push` |
| :---------- | :--------: | :----------------: |
| production  |    main    |         NO         |
| staging     |    next    |        YES         |

For each environment, the [CI/CD pipeline workflow](/.github/workflows/cicd_pipeline.yaml) calls three workflows from the [Nerdware reusable-workflows repo](https://github.com/Nerdware-LLC/reusable-action-workflows):

1. [`Node Test`](https://github.com/Nerdware-LLC/reusable-action-workflows/tree/main#node-test) - Runs test suites, adds test and coverage info to PRs, and updates [CodeCov](https://about.codecov.io/).
2. [`Release`](https://github.com/Nerdware-LLC/reusable-action-workflows/tree/main#release) - Creates a new GitHub release using [Semantic Release](https://github.com/semantic-release/semantic-release#readme).
3. [`S3 Upload`](https://github.com/Nerdware-LLC/reusable-action-workflows/tree/main#upload-to-s3) - Creates the relevant build and uploads it to an [AWS S3 bucket](https://aws.amazon.com/s3/).

### Codegen

TypeScript types are generated using [GraphQL Code Generator](https://graphql-code-generator.com/) and the [Fixit GraphQL schema](/fixit%40current.graphql). The same generated types are used throughout the entire Fixit stack.

When the [Fixit GraphQL schema](/fixit%40current.graphql) is updated during API development, changes are automatically pushed to [Apollo Studio](https://www.apollographql.com/), thereby enabling every component of the stack to use the latest version of the schema (or any particular previous version, if necessary). The schema changes are pulled into other Fixit repos using [Rover GitHub Actions](https://www.apollographql.com/docs/rover/ci-cd/#github-actions), but can also be pulled imperatively using the [Rover CLI](https://www.apollographql.com/docs/rover/).

## 📝 License

All files, scripts, and source code contained herein are for commercial use only by Nerdware, LLC.

See [LICENSE](/LICENSE) for more information.

<div align="center">

## 💬 Contact

Trevor Anderson - [@TeeRevTweets](https://twitter.com/teerevtweets) - [Trevor@Nerdware.cloud](mailto:trevor@nerdware.cloud)

  <a href="https://www.youtube.com/channel/UCguSCK_j1obMVXvv-DUS3ng">
    <img src=".github/assets/YouTube_icon_circle.svg" height="40" />
  </a>
  &nbsp;
  <a href="https://www.linkedin.com/in/trevor-anderson-3a3b0392/">
    <img src=".github/assets/LinkedIn_icon_circle.svg" height="40" />
  </a>
  &nbsp;
  <a href="https://twitter.com/TeeRevTweets">
    <img src=".github/assets/Twitter_icon_circle.svg" height="40" />
  </a>
  &nbsp;
  <a href="mailto:trevor@nerdware.cloud">
    <img src=".github/assets/email_icon_circle.svg" height="40" />
  </a>
  <br><br>

  <a href="https://daremightythings.co/">
    <strong><i>Dare Mighty Things.</i></strong>
  </a>

</div>

<!-- LINKS -->

[react-shield]: https://img.shields.io/badge/React-v18-61DAFB.svg?logo=react&logoColor=61DAFB&labelColor=gray
[pre-commit-shield]: https://img.shields.io/badge/pre--commit-33A532.svg?logo=pre-commit&logoColor=F8B424&labelColor=gray
[semantic-shield]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-E10098.svg
[prettier-shield]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[license-shield]: https://img.shields.io/badge/license-Proprietary-000080.svg?labelColor=gray
