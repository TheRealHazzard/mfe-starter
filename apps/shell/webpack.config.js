// Remote locations are resolved at build time, so each environment can point
// the shell at its own deployments:
//   PRODUCTS_URL=https://products.example.com CART_URL=https://cart.example.com npm run build -w @mfe/shell
const productsUrl = process.env.PRODUCTS_URL || 'http://localhost:4001';
const cartUrl = process.env.CART_URL || 'http://localhost:4002';

// BASENAME is the path the site is served under (for example /mfe-starter on GitHub Pages).
const basename = process.env.BASENAME || '';

module.exports = require('../../tools/webpack.base')({
  name: 'shell',
  port: 4000,
  dirname: __dirname,
  define: { 'process.env.BASENAME': JSON.stringify(basename) },
  remotes: {
    products: `products@${productsUrl}/remoteEntry.js`,
    cart: `cart@${cartUrl}/remoteEntry.js`,
  },
});
