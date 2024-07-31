import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  publicDir: "public",
  base: "/",

  build: {
    // target: "esnext",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        settings: resolve(__dirname, "src/dashboard/settings/index.html"),
        "join-us": resolve(__dirname, "join-us/index.html"),
        volunteer: resolve(__dirname, "src/dashboard/volunteer/index.html"),
        creator: resolve(__dirname, "src/dashboard/creator/index.html"),
        "volunteer-login": resolve(
          __dirname,
          "join-us/volunteer/volunteer-login/index.html"
        ),
        "volunteer-signup": resolve(
          __dirname,
          "join-us/volunteer/volunteer-signup/index.html"
        ),
        "creator-login": resolve(
          __dirname,
          "join-us/creator/creator-login/index.html"
        ),
        "creator-signup": resolve(
          __dirname,
          "join-us/creator/creator-signup/index.html"
        ),
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "https://plantforfuture-0aad8652667a.herokuapp.com/",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, "/api"),
    //   },
    // },
  },

  plugins: [],
});
