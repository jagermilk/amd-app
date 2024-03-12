import path from 'node:path'
import { defineConfig,loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return{
    plugins: [
      uni(),
      Unocss(),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(root, './src'),
        },
      ]
    }
  }
 
  // server: {
  //   host: true,
  //   port: 5173,
  //   proxy: {
  //     '/api/v1': {
  //       target: 'http://test.mycar.direct/',
  //       changeOrigin: true,
  //       rewrite: (p) => p.replace(/^\/api\/v1/, 'api/v1'),
  //     },
  //   },
  // },
})
