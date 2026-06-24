import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    outDir: 'public',
    lib: {
      entry: 'src/sw.ts',
      name: 'FamilyHubServiceWorker',
      fileName: 'sw',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'sw.js',
        format: 'es',
        inlineDynamicImports: true,
      },
    },
  },
})
