module.exports = require('../../tools/webpack.base')({
  name: 'products',
  port: 4001,
  dirname: __dirname,
  exposes: { './App': './src/App.tsx' },
});
