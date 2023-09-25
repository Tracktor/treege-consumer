import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
import { dependencies, name, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "[name]",
      name,
    },
    rollupOptions: {
      external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
      output: {
        globals: {
          "@tracktor/design-system": "ReactDOM",
          "lodash-es": "lodashEs",
          react: "React",
          "react-dom": "designSystem",
        },
      },
    },
  },
  plugins: [dts(), react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/test.config.ts",
  },
});
