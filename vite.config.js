import { fileURLToPath, URL } from "node:url";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // reactivityTransform: true,
    }),
    ReactivityTransform(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
  },
  server: {
    port: 8080,
  },
});
