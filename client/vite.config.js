import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

function dataLoader(variables) {
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
        let chunks = [];
        for (let envvar of variables) {
          const name = envvar.toLowerCase().split('_')?.[1];
          console.log(envvar, name);
          const jsonPath = loadEnv('', process.cwd(), envvar)?.[envvar];
          const data = fs.existsSync(jsonPath) ? fs.readFileSync(jsonPath) : '{}';
          chunks.push(`"${name}":${data}`);
        }
        return `export const data = {${chunks.join(',')}}`;
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
  plugins: [vue(), dataLoader(['VITE_CONTENT', 'VITE_META'])],
});
