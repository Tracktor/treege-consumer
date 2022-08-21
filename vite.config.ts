import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { dependencies, name, peerDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
      output: {
        globals: {
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
});
