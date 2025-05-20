import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tscongPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: '.',
  plugins: [
    react({
      include: '**/*.tsx'
    }),
    tscongPaths()
  ],
  resolve: {
    alias: {
      src: '/src'
    }
  },
  build: {
    outDir: './build'
  },
  server: {
    host: true, // <- important
    port: 3000,
    watch: {
      usePolling: true // <- useful in Docker
    }
  }
});
