import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: ['scity.innovation.com.vn'],
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: ['scity.innovation.com.vn'],
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
