import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import eslintPlugin from 'vite-plugin-eslint' //导入包
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    }),
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),],
  css: {
    preprocessorOptions: {
      less: {
      }
    }
  },
})
