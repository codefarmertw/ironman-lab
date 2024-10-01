import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['esbuild-split/entry1.js', 'esbuild-split/entry2.js'],
  bundle: true,
  splitting: true,
  outdir: 'dist',
  format: 'esm',
  platform: 'node',
  outExtension: { '.js': '.mjs' },
})
