module.exports = {
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:jest/recommended",
    "plugin:testing-library/react"
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  globals: {
    React: true,
    JSX: true
  },
  ignorePatterns: ["node_modules/*", ".github/*", "public/*", "build/*", "coverage/*"],
  rules: {
    "no-unused-vars": "warn",
    "react/jsx-uses-vars": "warn",
    "react/jsx-uses-react": "warn",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
