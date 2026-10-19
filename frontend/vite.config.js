import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The app's components use JSX inside .js files (from create-react-app days),
// so esbuild is told to parse .js as JSX.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/ })],
  esbuild: { loader: 'jsx', include: /src\/.*\.jsx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:8000' },
  },
  build: { outDir: 'build' },
});
