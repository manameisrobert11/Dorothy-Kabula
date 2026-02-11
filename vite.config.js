import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        donate: resolve(__dirname, "donate.html"),
        impact: resolve(__dirname, "impact.html"),
        news: resolve(__dirname, "news.html"),
        programmes: resolve(__dirname, "programmes.html"),

        // IMPORTANT: match your actual filename exactly:
        // you currently have "patnerships.html" in your project
        patnerships: resolve(__dirname, "patnerships.html"),
      },
    },
  },
});
