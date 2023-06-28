import eslintJS from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import testingLibPlugin from "eslint-plugin-testing-library";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";

/** @type { import("eslint").Linter.FlatConfig } */
export default [
  ////////////////////////////////////////////////////////////////
  // ALL FILES
  {
    files: ["src/**/*.[tj]s?(x)", "./*.[tj]s"],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsEslintParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
      import: importPlugin,
    },
    rules: {
      ...eslintJS.configs.recommended.rules,
      ...tsEslintPlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      eqeqeq: ["error", "always"],
      "no-alert": "warn",
      "no-console": "warn",
      "no-unused-vars": "off", // @typescript-eslint/no-unused-vars is used instead
      "prefer-const": "warn",
      "import/dynamic-import-chunkname": "error",
      "import/no-named-as-default-member": "off",
      "import/no-webpack-loader-syntax": "error",
      "@typescript-eslint/no-empty-function": "off", // Initial context objects often contain empty placeholder fns
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".js", ".jsx"],
      },
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
  },
  ////////////////////////////////////////////////////////////////
  // TSX,JSX FILES
  {
    files: ["src/**/*.[tj]sx"],
    languageOptions: {
      globals: {
        React: "readonly",
      },
    },
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-autofocus": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "react/jsx-uses-react": "warn",
      "react/jsx-uses-vars": "warn",
      "react/no-unescaped-entities": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  ////////////////////////////////////////////////////////////////
  // TEST FILES
  {
    files: ["src/**/*.{test,spec}.[tj]s?(x)"],
    languageOptions: {
      globals: {
        React: "readonly",
        vitest: "readonly",
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        assert: "readonly",
        suite: "readonly",
        test: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: {
      vitest: vitestPlugin,
      "testing-library": testingLibPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      ...testingLibPlugin.configs.react.rules,
      "testing-library/no-debugging-utils": "warn",
    },
  },
  ////////////////////////////////////////////////////////////////
  // NON-TEST FILES
  {
    files: ["src/**/*"],
    ignores: ["**/__tests__/**/*", "src/**/*.{test,spec}.[tj]s?(x)"],
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
  ////////////////////////////////////////////////////////////////
];
