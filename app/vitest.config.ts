import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  test: {
    environmentMatchGlobs: [
      // all tests in tests/dom will run in jsdom
      ['test/**', 'jsdom'],
      // ...
    ]
  }
})
