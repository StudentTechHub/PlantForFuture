import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  publicDir: "public",
  base: "/",

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        joinUs: resolve(__dirname, "joinUs/index.html"),
        settings: resolve(__dirname, "src/dashboard/settings/index.html"),
        volunteerLogin: resolve(__dirname, "joinUs/volunteer/volunteerLogin/index.html"),
        volunteerSignup: resolve(__dirname, "joinUs/volunteer/volunteerSignup/index.html"),
        creatorLogin: resolve(__dirname, "joinUs/creator/creatorLogin/index.html"),
        creatorSignup: resolve(__dirname, "joinUs/creator/creatorSignup/index.html"),
        volunteerDashboard: resolve(__dirname, "src/dashboard/volunteerDashboard/index.html"),
        creatorDashboard: resolve(__dirname, "src/dashboard/creatorDashboard/index.html"),
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },

  plugins: [
    // Add any Vite plugins here (optional)
  ],
});
