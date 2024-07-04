import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
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
