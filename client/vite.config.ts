import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "CLIENT_",
  server: {
    host: true,
    port: 8888,
  },
  preview: {
    port: 8888,
  },
});
