import { sentryVitePlugin } from "@sentry/vite-plugin";
import reactPlugin from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import GithubActionsReporter from "vitest-github-actions-reporter";
import { coverageConfigDefaults } from "vitest/config";

/**
 * @docs https://vitejs.dev/config/
 *
 * Plugins:
 * - [React Plugin](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#readme)
 * - [SVGR Plugin](https://react-svgr.com/docs/options/)
 * - [Sentry plugin](https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/uploading/vite/)
 */
export default defineConfig(({ mode, command }) => {
  // Gather environment variables (these may or may not be present)
  const {
    VITE_API_PROTOCOL,
    VITE_API_BASE_URI,
    VITE_SENTRY_AUTH_TOKEN,
    VITE_NPM_LIFECYCLE_SCRIPT,
  } = loadEnv(mode, process.cwd(), "VITE");

  // For env-specific configs, ascertain info about the execution context:
  const isProdBuild = command === "build" && mode === "production";
  const isStorybookBuild = /storybook/.test(VITE_NPM_LIFECYCLE_SCRIPT ?? "");

  return {
    plugins: [
      reactPlugin({
        jsxImportSource: "@emotion/react",
        babel: { plugins: ["@emotion/babel-plugin"] },
      }),
      svgrPlugin({ svgrOptions: { icon: true } }),
      viteTsconfigPaths({
        projects: [isProdBuild && !isStorybookBuild ? "./tsconfig.build.json" : "./tsconfig.json"],
      }),
      /* The Sentry-vite plugin uploads prod-build source maps to Sentry, and also adds
      support for release management. It must be placed last after all other plugins.*/
      ...(isProdBuild && !isStorybookBuild && !!VITE_SENTRY_AUTH_TOKEN
        ? [
            sentryVitePlugin({
              org: "nerdware-io",
              project: "fixit-web",
              authToken: VITE_SENTRY_AUTH_TOKEN,
              telemetry: true,
            }),
          ]
        : []),
    ],

    server: {
      open: true, // Open browser on server start
      strictPort: true, // Exit if port is in use
      host: "localhost",
      port: 3000,
      proxy: {
        "^/api": {
          target: `${VITE_API_PROTOCOL}://${VITE_API_BASE_URI}`,
          changeOrigin: true,
        },
      },
      // For HTTPS, use plugin @vitejs/plugin-basic-ssl
    },

    test: {
      /* `restoreMocks` accomplishes the following:
        - clears all spies of `spy.mock.calls` and `spy.mock.results` (same as clearMocks:true)
        - removes any mocked implementations (same as mockReset:true)
        - restores the original implementation so fns don't return undefined like with mockReset
      */
      restoreMocks: true,
      globals: true,
      silent: true,
      environment: "jsdom",
      server: {
        deps: {
          inline: ["vitest-canvas-mock"],
        },
      },
      include: ["**/?(*.){test,spec}.?(c|m)[tj]s?(x)"],
      setupFiles: ["./src/tests/setupTests.ts"],
      reporters: ["default", ...(process.env.GITHUB_ACTIONS ? [new GithubActionsReporter()] : [])],
      coverage: {
        include: ["src/**/*.{js,ts}"],
        exclude: [...coverageConfigDefaults.exclude, "**/tests/**/*", "**/__mocks__/**/*"],
        reporter: [
          ...coverageConfigDefaults.reporter,
          "json-summary", // <-- used by vitest-coverage-report GitHub Action
        ],
      },
    },

    build: {
      target: "esnext",
      outDir: "dist",
      sourcemap: true, // Required for Sentry-vite plugin
    },
  };
});
