<!-- REPO HEADER -->
<div align="center">
  <a href="https://github.com/Nerdware-LLC/fixit-web" >
    <img src=".github/assets/fixit_web_repo_header.png" alt="Header with logo" height="135">
  </a>
  <h1></h1> <!-- line separator (github applies a low-opacity bottom-border to h1 elements) -->
</div>

<!-- PROJECT SHIELDS GO HERE -->
<div align="center">
  &nbsp; <!-- &nbsp to nudge shields down just a tad -->
  <div align="center" style="width: 35%; display: flex; flex-direction: row; justify-content: space-around;">

[![pre-commit][pre-commit-shield-url]](https://github.com/pre-commit/pre-commit)

[![code style: prettier][prettier-shield-url]](https://github.com/prettier/prettier)

  </div>
</div>

---

Fixit Web provides Fixit users with business-critical web interfaces that are each a crucial part of the user's journey, like the Stripe-powered [CheckoutPage](/src/pages/CheckoutPage/). Each page contained in this project connects one part of the user onboarding funnel to another.

### Table of Contents

- [☁️ Cloud Architecture](#️-cloud-architecture)
  - [End-User Delivery](#end-user-delivery)
- [👨‍💻 Front-End Development](#-front-end-development)
  - [🗺 Project Layout](#-project-layout)
  - [Create React App](#create-react-app)
    - [Available Scripts](#available-scripts)
  - [Browserslist](#browserslist)
  - [Testing](#testing)
    - [Auto-Mocked Node Modules](#auto-mocked-node-modules)
- [License](#license)
- [Contact](#contact)

---

## ☁️ Cloud Architecture

As with all Fixit cloud infrastructure, IaC files responsible for _defining_ and _implementing_ Fixit Web's cloud architecture/resources are split between two sibling repos:

- [**fixit-cloud-modules**](https://github.com/Nerdware-LLC/fixit-cloud-modules) &nbsp; Terraform modules which _define_ Fixit Web's cloud.
- [**fixit-cloud-live**](https://github.com/Nerdware-LLC/fixit-cloud-live) &nbsp;&nbsp;&nbsp; Terragrunt configs which _implement_ Fixit Web's cloud.

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

---

## 👨‍💻 Front-End Development

Welcome to the team. Please review the info below to familiarize yourself with the project.

> 💡 If you have any questions, please don't hesitate to ask.

### 🗺 Project Layout

- [`__mocks__`](/__mocks__) &nbsp; Mock npm modules (these are automatically mocked in test files, [see here](#auto-mocked-node-modules)).
- [`.github`](/.github) &nbsp; &nbsp;&nbsp; GitHub Actions and other GitHub-related files.
- [`public`](/public) &nbsp; &nbsp; &nbsp;&nbsp; HTML, favicon, and other dist files.
- [`src`](/src) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Source code root dir.
  - [`src/__tests__`](/src/__tests__) &nbsp;&nbsp; 🃏 Jest integration and unit tests.
  - [`src/app`](/src/app) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Top-level app structure JSX.
  - [`src/components`](/src/components) &nbsp; Individual JSX components.
  - [`src/config`](/src/config) &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Init logic and run-time env vars object.
  - [`src/images`](/src/images) &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; In-app image assets (included with build bundle).
  - [`src/navigation`](/src/navigation) &nbsp; Routing-related JSX.
  - [`src/pages`](/src/pages) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Application pages (nav targets).
  - [`src/services`](/src/services) &nbsp; &nbsp; &nbsp; HTTP handlers for the Fixit and Stripe APIs.
  - [`src/types`](/src/types) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Prop-types objects.
  - [`src/utils`](/src/utils) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; Helper functions for formatting, logging, etc.

### Create React App

This project was bootstrapped with [Create React App v5](https://github.com/facebook/create-react-app/docs) using the "typescript" template.

#### Available Scripts

In the project root directory, you can run:

- `npm start` Runs the app in "development" mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\
  The page will reload if you make edits.\
  You will also see any errors in the console.

- `npm test` Launches the test runner, [Jest](https://jestjs.io/docs/getting-started).\
  If you'd like to run tests using the interactive "watch" mode, use `npm test -- --watchAll=true`.\
  Links to more info regarding tests/testing:\
  &nbsp; &nbsp;&nbsp; • [create-react-app docs: running-tests](https://facebook.github.io/create-react-app/docs/running-tests)\
  &nbsp; &nbsp;&nbsp; • [README: Testing](#testing)

- `npm run build` Builds the app and places the resultant files in `/[repo_root]/build/`.\
  It correctly bundles React in production mode and optimizes the build for the best performance.\ <!-- TODO add info on building staging env -->
  The build is minified and the filenames include the hashes.\
  Links to more info regarding builds/building:\
  &nbsp; &nbsp;&nbsp; • [create-react-app docs: deployment](https://facebook.github.io/create-react-app/docs/deployment)

- `npm run eject` Provides full access to the underlying tools and configs that are normally obfuscated by create-react-app.\
  **WARNING: this is a one-way operation. Once you `eject`, you can’t go back!**\
  Due to the one-way nature of `eject`, the main branch will likely never be ejected.\
  However, this CRA-default npm script is retained for toying around with Webpack/Babel/ESLint/etc on throwaway branches.

### Browserslist

Some of the [package.json "browserslist"](/package.json#"browserslist") elements were included as part of the _create-react-app_ template defaults, while others are required by [Material UI](https://mui.com/guides/migration-v4/#supported-browsers-and-node-versions) (note that these are not mutually exclusive).

The included Browserslist queries were sourced as follows -

```jsonc
"browserslist": {
  "production": [
    ">0.2%",                    // create-react-app
    "last 2 versions",          // MUI
    "Firefox ESR",              // MUI
    "not dead",                 // create-react-app & MUI
    "not IE 11",                // MUI
    "not op_mini all",          // create-react-app
    "maintained node versions"  // MUI
  ],
  "development": [
    "last 1 chrome version",    // create-react-app
    "last 1 firefox version",   // create-react-app
    "last 1 safari version"     // create-react-app
  ]
}
```

More info on Browserslist queries can be found [here](https://github.com/browserslist/browserslist).

### Testing

#### Auto-Mocked Node Modules

Mock implementations of the npm modules listed below are available for testing and are auto-mocked by Jest (i.e., explicitly calling `jest.mock('foo-module')` in test files is not necessary). [More info here](https://jestjs.io/docs/manual-mocks#mocking-node-modules).

- [react-router-dom](/__mocks__/react-router-dom.js)

---

## License

All files and/or source code contained herein are for commercial use only by Nerdware, LLC.

See [LICENSE](/LICENSE) for more information.

## Contact

Trevor Anderson - [@TeeRevTweets](https://twitter.com/teerevtweets) - T.AndersonProperty@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[pre-commit-shield-url]: https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white
[prettier-shield-url]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[linkedin-url]: https://www.linkedin.com/in/trevor-anderson-3a3b0392/
[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white

<!-- MERMAID CHARTS:
Docs:         https://mermaid-js.github.io/mermaid/#/n00b-syntaxReference
Live Editor:  https://mermaid-js.github.io/mermaid-live-editor/edit
-->
