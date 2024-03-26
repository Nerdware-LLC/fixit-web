// @ts-check
import eslintJS from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import * as importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import * as mdxPlugin from "eslint-plugin-mdx";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import * as storybookPlugin from "eslint-plugin-storybook";
import testingLibPlugin from "eslint-plugin-testing-library";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";
import tsEslint from "typescript-eslint";

/** @type { import("eslint").Linter.FlatConfig } */
export default [
  ////////////////////////////////////////////////////////////////
  // ALL TS & JS FILES
  {
    files: ["src/**/*.[tj]s?(x)", "./*.[tj]s", ".storybook/**/*.ts"],
    ignores: ["src/**/__codegen__/**/*"], // don't lint generated code
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsEslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsEslint.plugin,
      import: importPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...eslintJS.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules, // impl here bc hooks can be ts or tsx
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs["typescript"].rules,
      ...tsEslint.configs.eslintRecommended.rules, // turns off base eslint rules covered by ts-eslint
      ...[
        ...tsEslint.configs.strictTypeChecked,
        ...tsEslint.configs.stylisticTypeChecked, // prettier-ignore
      ].reduce((acc, { rules = {} }) => ({ ...acc, ...rules }), {}),
      "default-case": "error",
      "default-case-last": "error",
      eqeqeq: ["error", "always"],
      "no-alert": "warn",
      "no-console": "warn",
      "prefer-const": ["warn", { destructuring: "all" }],
      "prefer-object-has-own": "error",
      "prefer-promise-reject-errors": "error",
      semi: ["error", "always"],
      "import/named": "off", //                      TS performs this check
      "import/namespace": "off", //                  TS performs this check
      "import/default": "off", //                    TS performs this check
      "import/no-named-as-default-member": "off", // TS performs this check
      "import/no-webpack-loader-syntax": "error",
      "@typescript-eslint/array-type": "off", // Allow "T[]" and "Array<T>"
      "@typescript-eslint/consistent-indexed-object-style": "off", // Allow "Record<K, V>" and "{ [key: K]: V }"
      "@typescript-eslint/consistent-type-definitions": "off", // Allow "type" and "interface", there are subtle usage differences
      "@typescript-eslint/no-confusing-void-expression": "off", // <-- rule results in false positives on RRD's `navigate` fn
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": ["error", { ignoreIIFE: true, ignoreVoid: true }],
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-invalid-void-type": "off", // Allow "void" in unions
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@mui/*/*/*"],
              message: `3rd-level imports from the "@mui" package ("@mui/*/*/*") can cause module duplication and should be refactored.`,
              // Source: https://mui.com/material-ui/guides/minimizing-bundle-size/#option-one-use-path-imports
            },
          ],
        },
      ],
      "@typescript-eslint/no-throw-literal": "off", // <-- rule results in false positives when an error is re-thrown
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/no-unnecessary-condition": "off", // Allow option chains to convey "dont know if preceding exists"
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: false,
          // `...props` is too common to enable ignoreRestSiblings in this project
        },
      ],
      "@typescript-eslint/only-throw-error": "off", // <-- rule results in false positives for Error-like objects/subclasses
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-nullish-coalescing": [
        "error",
        {
          ignoreConditionalTests: true,
          ignorePrimitives: { string: true },
        },
      ],
      "@typescript-eslint/prefer-reduce-type-parameter": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowBoolean: true,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
      ...eslintConfigPrettier.rules, // <-- must be last, removes rules that conflict with prettier
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".js", ".jsx"],
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  ////////////////////////////////////////////////////////////////
  // TSX,JSX FILES
  {
    files: ["src/**/*.[tj]sx"],
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
      react: reactPlugin,
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-autofocus": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "react/jsx-uses-react": "warn",
      "react/jsx-uses-vars": "warn",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  ////////////////////////////////////////////////////////////////
  // STORYBOOK FILES
  // Note: The storybook plugin is not yet structured for FlatConfig, and its exports are not yet typed.
  // See https://github.com/storybookjs/eslint-plugin-storybook/blob/main/lib/configs/recommended.ts
  {
    files: ["src/**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
    plugins: { storybook: storybookPlugin },
    rules: {
      ...storybookPlugin.configs.recommended.overrides[0].rules,
      "no-alert": "off",
      "no-console": "off",
      "react-hooks/rules-of-hooks": "off",
    },
  },
  {
    files: [".storybook/main.@(js|cjs|mjs|ts)"],
    plugins: { storybook: storybookPlugin },
    rules: storybookPlugin.configs.recommended.overrides[1].rules,
  },
  ////////////////////////////////////////////////////////////////
  // MDX FILES   https://github.com/mdx-js/eslint-mdx#flat-config
  {
    ...mdxPlugin.flat,
    processor: mdxPlugin.createRemarkProcessor({ lintCodeBlocks: true }),
  },
  {
    ...mdxPlugin.flatCodeBlocks,
    rules: {
      ...mdxPlugin.flatCodeBlocks.rules,
      "no-var": "error",
      "prefer-const": "warn",
    },
  },
  ////////////////////////////////////////////////////////////////
  // TEST FILES
  {
    files: ["src/**/*.test.[tj]s?(x)", "**/tests/**/*", "**/__mocks__/**/*"],
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
      "testing-library": testingLibPlugin,
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      ...testingLibPlugin.configs.react.rules,
      "testing-library/no-debugging-utils": "warn",
      "testing-library/render-result-naming-convention": "off",
      "vitest/expect-expect": "warn",
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "warn",
      "vitest/valid-expect": "warn",
    },
  },
  ////////////////////////////////////////////////////////////////
  // NON-TEST FILES
  {
    files: ["src/**/*"],
    ignores: [
      "src/**/*.test.[tj]s?(x)",
      "src/**/tests/**/*",
      "src/**/*.stories.tsx",
      "src/components/DevTools/**/*",
    ],
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          patterns: [
            {
              group: ["@/tests/*"],
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
