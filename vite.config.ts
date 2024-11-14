/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), dts({ rollupTypes: true })],
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
    environment: "jsdom",
    globals: true,
    // isolate: false,
    // sequence: {
    //   concurrent: true,
    // },
    coverage: {
      include: ["src/**/*.ts"],
    },
  },
});
