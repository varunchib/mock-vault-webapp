import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  build: {
    // Split large, rarely-changing vendor libraries into their own chunks so
    // (a) the main entry bundle shrinks — less JS to parse before first paint,
    // (b) they download in parallel, and (c) they stay cached across app deploys
    // (a code change no longer busts the react/framer/icons cache).
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-router")) return "router";
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("@react-oauth") || id.includes("google")) return "auth";
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler"))
            return "react";
        },
      },
    },
  },
});
