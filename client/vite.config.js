import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis', 
  },
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'https://fashion-web-9s7i.onrender.com', 
        changeOrigin: true,
        secure: false,
      },
      '^/ws/.': {
        target: 'https://fashion-web-9s7i.onrender.com', 
        ws: true,
        changeOrigin: true,
        secure: false,
      },
      '/community': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});