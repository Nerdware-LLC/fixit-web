import { sentryVitePlugin } from "@sentry/vite-plugin";
import reactPlugin from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
// import eslintPlugin from "vite-plugin-eslint";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import GithubActionsReporter from "vitest-github-actions-reporter";

/**
 * @docs https://vitejs.dev/config/
 *
 * Plugins:
 * - [SVGR Plugin](https://react-svgr.com/docs/options/)
 * - [Sentry plugin](https://docs.sentry.io/platforms/javascript/guides/react/sourcemaps/uploading/vite/)
 */
export default defineConfig(({ mode }) => {
  const {
    VITE_API_PROTOCOL,
    VITE_API_BASE_URI,
    VITE_SENTRY_AUTH_TOKEN
  } = loadEnv(mode, process.cwd(), "VITE"); // prettier-ignore

  return {
    plugins: [
      reactPlugin({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      // TODO Enable eslint plugin once they've updated the pkg to allow the new eslint config file
      // eslintPlugin(),
      svgrPlugin({ svgrOptions: { icon: true } }),
      viteTsconfigPaths({
        projects: [mode === "production" ? "./tsconfig.build.json" : "./tsconfig.json"],
      }),
      // The Sentry-vite plugin must be placed last after all other plugins
      ...(/^(dev|prod)/i.test(mode) && !!VITE_SENTRY_AUTH_TOKEN
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
      globals: true,
      environment: "jsdom",
      include: ["**/?(*.){test,spec}.?(c|m)[tj]s?(x)"],
      setupFiles: ["./src/__tests__/setupTests.ts"],
      reporters: [
        "default",
        ...(process.env.GITHUB_ACTIONS ? [new GithubActionsReporter()] : []),
      ], // prettier-ignore
    },

    build: {
      outDir: "build",
      sourcemap: true, // Required for Sentry-vite plugin
    },
  };
});
