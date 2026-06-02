import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPage = repositoryName.endsWith(".github.io");
const base = process.env.GITHUB_PAGES === "true" && repositoryName && !isUserOrOrgPage ? `/${repositoryName}/` : "/";

export default defineConfig({
  base,
  plugins: [react()]
});
