import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import eslintPlugin from 'vite-plugin-eslint';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    dts({
      entryRoot: path.resolve(__dirname, 'lib'),
    }),
    eslintPlugin(),
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        plugins: [
          /**
           * @vitejs/plugin-legacy does not support library mode:
           * https://github.com/vitejs/vite/issues/1639
           *
           * Transforming ES6+ syntax to ES5 is not supported yet, there are two ways to do:
           * https://github.com/evanw/esbuild/issues/1010#issuecomment-803865232
           * We choose to run Babel on the output files after esbuild.
           *
           * Running Babel on the generated code:
           * https://github.com/rollup/plugins/blob/master/packages/babel/README.md#running-babel-on-the-generated-code
           */
          getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
              ['@babel/preset-env'],
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', {
                'corejs': 3,
              }],
            ],
          }),
        ],
      },
    },
  },
});
