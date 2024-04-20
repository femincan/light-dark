import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  platform: 'browser',
  clean: true,
  minify: true,
  dts: true,
});
