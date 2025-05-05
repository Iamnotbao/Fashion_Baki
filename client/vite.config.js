import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis', 
  },
  build: {
    outDir: '../dist/client'  
  },
  base: '/Fashion_Baki/',
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'https://fashion-web-deoh.onrender.com', 
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'http://localhost:8080', 
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