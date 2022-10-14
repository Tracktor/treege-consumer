import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
import { name } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "[name]",
      name,
    },
    rollupOptions: {
      external: ["design-system-tracktor", "react", "react-dom"],
      output: {
        globals: {
          "design-system-tracktor": "designSystemTracktor",
          "find-and": "findAnd",
          "lodash-es": "lodashEs",
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  plugins: [dts(), react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  test: {
    coverage: {
      exclude: ["node_modules/", "src/config/setupTests.ts"],
      reporter: ["text", "html"],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "src/config/setupTests.ts",
  },
});
