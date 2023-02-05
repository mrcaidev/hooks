/// <reference types="vitest" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import { removeRedundantDts } from "./plugins/remove-redundant-dts";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      afterBuild: removeRedundantDts,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "@mrcaidev/hooks",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
