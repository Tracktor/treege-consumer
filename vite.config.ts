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
          "@mui/x-date-pickers": "xDatePickers",
          "@mui/x-date-pickers-pro": "xDatePickersPro",
          "@mui/x-license": "muiXLicense",
          "@tanstack/react-query": "reactQuery",
          "@tracktor/design-system": "ReactDOM",
          "@tracktor/react-utils": "reactUtils",
          dayjs: "dayjs",
          "lodash-es": "lodashEs",
          react: "React",
          "react-dom": "designSystem",
        },
      },
    },
  },
  plugins: [
    dts({
      exclude: ["**/*.test.ts", "**/*.test.tsx", "vite.config.ts", "src/test.config.ts", "**/test/**/*", "example"],
    }),
    react(),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "example",
        replacement: resolve(__dirname, "example"),
      },
    ],
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "src/test.config.ts",
  },
});
