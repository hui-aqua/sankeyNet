import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const base = process.env.GITHUB_PAGES === "true" && repositoryName && !isUserOrOrgPage ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    css: true
  }
});
