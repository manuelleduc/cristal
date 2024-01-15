import { defineConfig, mergeConfig } from "vite";
import defaultConfig from "../../vite.vue.config.js";
import { VitePluginNode } from "vite-plugin-node";

export default mergeConfig(
  defaultConfig,
  defineConfig({
    build: {
      lib: {
        entry: "./src/index.ts",
        name: "electronstorage",
      },
    },
    plugins: [
      ...VitePluginNode({
        appPath: "./app.ts",
        adapter({ app, req, res, next }) {
          app(res, res);
        },
      }),
    ],
  }),
);
