<!-- REPO HEADER -->
<div align="center">
  <a href="https://github.com/Nerdware-LLC/fixit-web" >
    <img src=".github/assets/fixit_web_repo_header.png" alt="Header with logo" height="135">
  </a>
  <h1></h1> <!-- line separator (github applies a low-opacity bottom-border to h1 elements) -->
</div>

<!-- PROJECT SHIELDS GO HERE -->
<div align="center">
  <span>&nbsp;</span> <!-- &nbsp to nudge shields down just a tad -->
  <span align="center" style="width: 35%; display: flex; flex-direction: row; justify-content: space-around;">

[![pre-commit][pre-commit-shield-url]](https://github.com/pre-commit/pre-commit)

[![code style: prettier][prettier-shield-url]](https://github.com/prettier/prettier)

  </span>
</div>

---

## 🗺 Project Layout

- [`.github`](/.github) &nbsp; GitHub Actions and other GitHub-related files.
- [`public`](/public) &nbsp;&nbsp;&nbsp; HTML, favicon, and other dist files.
- [`src`](/src) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Source code root dir.
  - [`src/__tests__`](/src/__tests__) &nbsp;&nbsp; 🃏 Jest integration and unit tests.
  - [`src/app`](/src/app) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Top-level app structure JSX.
  - [`src/components`](/src/components) &nbsp; Individual JSX components.
  - [`src/config`](/src/config) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Init logic and run-time env vars object.
  - [`src/images`](/src/images) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; In-app image assets (included with build bundle).
  - [`src/navigation`](/src/navigation) &nbsp; Routing-related JSX.
  - [`src/pages`](/src/pages) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Application pages (nav targets).
  - [`src/services`](/src/services) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HTTP handlers for the Fixit and Stripe APIs.
  - [`src/types`](/src/types) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Prop-types objects.
  - [`src/utils`](/src/utils) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Helper functions for formatting, logging, etc.

## Create React App

This project was bootstrapped with [Create React App v5](https://github.com/facebook/create-react-app/docs) using the "typescript" template.

## Available Scripts

In the project root directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

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
