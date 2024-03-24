import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend server address
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Rewrite the path, removing '/api' prefix
      },
      '/user': {
        target: 'http://localhost:3000', // Your backend server address
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/user/, '') // Rewrite the path, removing '/user' prefix
      }
    }
  }
});
