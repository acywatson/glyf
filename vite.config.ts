import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import * as packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    dts({
        include: ['src/components/'],
    }),
    react(),
    tsConfigPaths(),
    cssInjectedByJsPlugin()
  ],
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: 'Glyf',
      formats: ['es', 'umd'],
      fileName: (format) => `glyf.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))
