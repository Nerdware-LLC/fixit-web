import remarkGfm from "remark-gfm";
import { mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";

export default {
  core: {},
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: [
    "./*.mdx", // <-- docs not associated with a story
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    {
      /* The "essentials" addon is a collection of addons which includes the following:
      actions, backgrounds, controls, docs, viewport, toolbars, measure, and outline. */
      name: "@storybook/addon-essentials",
      options: {
        docs: {
          mdxPluginOptions: {
            mdxCompileOptions: {
              remarkPlugins: [remarkGfm],
            },
          },
        },
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "storybook-addon-useragent",
  ],
  staticDirs: ["../public"],
  docs: { autodocs: "tag" },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // Speeds up Storybook build time
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
      // Makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // Makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules, but keep @mui props which are not excluded
      propFilter: (prop) => {
        let shouldInclude = true;

        // Test if prop is sourced from a 3rd-party module:
        if (prop?.parent?.fileName) {
          // Test if the 3rd-party module is a @mui packaage:
          if (/node_modules\/@mui/.test(prop.parent.fileName)) {
            // Test if the @mui package prop is excluded:
            shouldInclude = !["as", "classes"].includes(prop.name);
          } else {
            // Exclude 3rd-party package props:
            shouldInclude = false;
          }
        }

        return shouldInclude;
      },
    },
  },
  /**
   * This `viteFinal` function ensures the Vite-builder is configured to use
   * a `build.target` value of "esnext" for Storybook builds. By default, the
   * Vite-builder currently does not use the `build.target` specified in the
   * `vite.config.ts` file, so SB builds fail without this override.
   *
   * @see https://github.com/storybookjs/storybook/issues/22223
   * @docs https://storybook.js.org/docs/api/main-config-vite-final
   */
  viteFinal: (viteConfig) => {
    return mergeConfig(viteConfig, {
      build: {
        target: "esnext",
      },
    });
  },
} satisfies StorybookConfig;
