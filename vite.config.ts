import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      // Declared before '/api' so the more specific prefix matches first.
      '/api/chat': {
        target: 'http://localhost:8000',
        rewrite: (path) => path.replace(/^\/api\/chat/, ''),
      },
      '/api': 'http://localhost:5001',
    },
  },
});
