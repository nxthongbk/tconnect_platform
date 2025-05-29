import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7070,
    host: true,
    allowedHosts: ['esg.innovation.com.vn'],
  },
  preview: {
    host: true,
    port: 7070,
    allowedHosts: ['esg.innovation.com.vn'],
    // allowedHosts: ['*']
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'window',
  },
});
