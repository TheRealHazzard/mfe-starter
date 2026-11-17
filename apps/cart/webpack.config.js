module.exports = require('../../tools/webpack.base')({
  name: 'cart',
  port: 4002,
  dirname: __dirname,
  exposes: {
    './App': './src/App.tsx',
    './CartBadge': './src/CartBadge.tsx',
  },
});
