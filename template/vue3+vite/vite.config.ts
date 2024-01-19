import { fileURLToPath, URL } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  // base: '/',
  define: {
    'process.env.BUILD_TIME': JSON.stringify(new Date().toLocaleString()),
  },
  plugins: [
    vue(),
    legacy({
      modernPolyfills: true, // consider using an on-demand service like Polyfill.io to only inject necessary polyfills based on actual browser user-agents
    }),
    // splitVendorChunkPlugin(),
    eslintPlugin(),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
        }),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        { 'lodash-es': [['*', '_']] },
      ],
      dts: 'src/auto-import.d.ts',
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        // filepath: './.eslintrc-auto-import.json',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'https://getman.cn/api',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true,
      },
    },
  },
  build: {
    assetsInlineLimit: 1024 * 8,
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': [
            'vue',
            'vue-router',
            'pinia',
          ],
          'component-library-vendor': [
            'ant-design-vue',
          ],
        },
      },
    },
  },
});
