import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  outfile: 'dist/out.js',
})
