/** @type { import("eslint").Linter.BaseConfig } */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: ["node_modules/*", ".github/*", "public/*", "build/*", "coverage/*"],
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
  ],
  plugins: ["import", "jest", "jsx-a11y", "react", "react-hooks", "testing-library"],
  rules: {
    "no-alert": "warn",
    "no-console": "warn",
    "no-unused-vars": "warn",
    "import/dynamic-import-chunkname": "error",
    "import/no-webpack-loader-syntax": "error",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json", "./tsconfig.paths.json"],
      },
    },
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      excludedFiles: [
        "**/__tests__/**/*",
        "*.test.ts",
        "*.test.tsx",
        "*.test.js",
        "*.test.jsx",
        "*.spec.ts",
        "*.spec.tsx",
        "*.spec.js",
        "*.spec.jsx",
      ],
      rules: {
        "no-restricted-imports": [
          "warn",
          {
            patterns: [
              {
                group: ["@tests*", "@tests/*", "@/__tests__*", "@/__tests__/*"],
                message:
                  "Test-related exports like mocks should only be imported in test-related files. " +
                  "If this file is part of a test suite, please rename it to match the pattern *.test.*",
              },
            ],
          },
        ],
      },
    },
  ],
};
