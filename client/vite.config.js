import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

const chunks = ['VITE_META', 'VITE_CONTENT'].map(envvar => {
  const jsonPath = loadEnv('', process.cwd(), envvar)?.[envvar];
  const text = fs.existsSync(jsonPath) && fs.readFileSync(jsonPath, 'utf8');
  return `"${envvar.toLowerCase().split('_')?.[1]}":${text}`;
});
const data = chunks?.[0] && JSON.parse(`{${chunks[0]}}`);

function htmlPlugin() {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return data?.meta?.project?.name ? html.replace(
        /(?<=<title>)(.*?)(?=<\/title>)/,
        data.meta.project.name,
      ) : html
    },
  }
}

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
        return `export const data = {${chunks.join(',')}}`;
      }
    },
  };
}

export default defineConfig({
  // define: {
  //   "import.meta.env.VITE_NAME":JSON.stringify("test")
  // },
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
  plugins: [vue(), dataLoader(), htmlPlugin()],
});
