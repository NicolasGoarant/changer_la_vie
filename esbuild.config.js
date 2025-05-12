#!/usr/bin/env node

const esbuild = require('esbuild');
const { copy } = require('esbuild-plugin-copy');

// Configuration esbuild simplifiée sans le plugin URL
esbuild.build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: 'app/assets/builds',
  publicPath: '/assets',
  sourcemap: true,
  format: 'esm',
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'file',
    '.gif': 'file'
  },
  plugins: [
    copy({
      assets: [
        {
          from: ['node_modules/leaflet/dist/images/*'],
          to: ['images/'],
        },
      ],
      watch: true
    }),
  ],
}).catch(() => process.exit(1));