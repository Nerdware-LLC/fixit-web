import { CodegenConfig } from "@graphql-codegen/cli";

/**
 * ### `@graphql-codegen` config file
 *
 * This file is used by the `@graphql-codegen/cli` package to generate
 * TypeScript types for GQL queries, mutations, etc.
 *
 * - Docs for `@graphql-codegen`:
 *   - https://graphql-code-generator.com/docs/getting-started/codegen-config
 *   - https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config#other-ways-to-provide-configuration
 *
 * - Docs for plugin `preset-client`:
 *   - https://the-guild.dev/graphql/codegen/plugins/presets/preset-client
 */
const codegenConfig: CodegenConfig = {
  schema: "./fixit@current.graphql",
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true,
  emitLegacyCommonJSImports: false,
  generates: {
    // This objects keys are Codegen output target files
    "src/graphql/__codegen__/": {
      preset: "client",
      plugins: [],

      // Preset configs
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },

      // Plugin configs
      config: {
        enumsAsTypes: true,
        useIndexSignature: true,
        useTypeImports: true,
        scalars: {
          ID: "string",
          DateTime: "Date",
          Email: "string",
        },
      },
    },
  },
};

export default codegenConfig;
