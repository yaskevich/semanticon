import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

function dataLoader() {
  const virtualModuleId = 'vite:data';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;

  return {
    name: 'vite-data',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const jsonPath = loadEnv('', process.cwd(), 'VITE_DATA')?.['VITE_DATA'];
        const data = fs.existsSync(jsonPath) ? fs.readFileSync(jsonPath) : '{}';
        return `export const data = ${data}`;
      }
    },
  };
}

export default defineConfig({
  server: {
    port: loadEnv('', process.cwd(), 'VITE_PORT')?.['VITE_PORT'] || 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:' + loadEnv('', process.cwd(), 'VITE_PROXY')?.['VITE_PROXY'] || 8081,
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  plugins: [vue(), dataLoader()],
});
