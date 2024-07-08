import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login/index.html'),
        signup: resolve(__dirname, 'signup/index.html'),
      },
    },
  },

  server: {
    port: 3000,
    open: true,
    // Adjust this to proxy API requests if needed
    proxy: {
      // '/api': 'http://localhost:3001/api'
    }
  },

  plugins: [
    // Add any Vite plugins here (optional)
  ]
});
