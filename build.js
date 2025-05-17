const esbuild = require('esbuild');
const { copy } = require('esbuild-plugin-copy');

esbuild.build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: 'app/assets/builds',
  publicPath: '/assets',
  format: 'esm',
  sourcemap: true,

  // 🧩 C'est ici qu'on dit à esbuild comment gérer les images
  loader: {
    '.png': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.gif': 'file',
    '.svg': 'file',
  },

  plugins: [
    copy({
      assets: [
        {
          from: ['node_modules/leaflet/dist/images/*'],
          to: ['app/assets/builds/images'],
        },
      ],
    }),
  ]
}).catch((error) => {
  console.error(error);
  process.exit(1);
});


