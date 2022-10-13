import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { name, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      fileName: "[name]",
      name,
    },
    minify: false,
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
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
    sourcemap: true,
  },
  plugins: [dts(), react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
});
