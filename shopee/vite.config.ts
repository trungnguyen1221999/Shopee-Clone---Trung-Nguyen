import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress all TypeScript warnings
        if (warning.code === "UNRESOLVED_IMPORT") return;
        if (warning.code === "THIS_IS_UNDEFINED") return;
        warn(warning);
      },
    },
  },
});
