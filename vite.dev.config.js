import vue from "@vitejs/plugin-vue2";
import path from "node:path";
import { defineConfig } from "vite";

const rootPath = path.join(process.cwd(), "examples");

/* @type {import('vite').UserConfig} */
export default defineConfig({
  root: rootPath,
  plugins: [vue()],
  base: '/designer/',
  resolve: {
    alias: [{
      find: "vue",
      replacement: "vue/dist/vue.esm.js"
    }]
  },
});
