import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxy = { '/api': process.env.PERMANEO_API_PROXY || 'http://127.0.0.1:8080' };

export default defineConfig({
  base: './',
  plugins: [react()],
  server: { proxy },
  preview: { proxy }
});
