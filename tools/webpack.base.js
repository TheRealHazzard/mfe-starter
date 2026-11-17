// One webpack config factory shared by every app, so the Module Federation
// wiring lives in exactly one place.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;

// Singletons: there must be exactly one copy of these at runtime. Two copies of
// React break hooks; two copies of @mfe/shared would split the cart state.
const singleton = { singleton: true, requiredVersion: false };
const shared = {
  react: singleton,
  'react-dom': singleton,
  'react-router-dom': singleton,
  '@mfe/shared': singleton,
};

module.exports =
  ({ name, port, dirname, exposes = {}, remotes = {}, define = {} }) =>
  (_env, argv) => {
    const isProd = argv.mode === 'production';
    return {
      entry: './src/index.ts',
      output: {
        path: path.join(dirname, 'dist'),
        publicPath: 'auto',
        clean: true,
        filename: isProd ? '[name].[contenthash:8].js' : '[name].js',
      },
      resolve: { extensions: ['.tsx', '.ts', '.js'] },
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'swc-loader',
              options: {
                jsc: {
                  parser: { syntax: 'typescript', tsx: true },
                  transform: { react: { runtime: 'automatic' } },
                  target: 'es2020',
                },
              },
            },
          },
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ],
      },
      plugins: [
        new webpack.DefinePlugin(define),
        new ModuleFederationPlugin({
          name,
          filename: 'remoteEntry.js',
          exposes,
          remotes,
          shared,
        }),
        new HtmlWebpackPlugin({ template: path.join(dirname, 'public/index.html') }),
      ],
      devServer: {
        port,
        hot: true,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
      devtool: isProd ? 'source-map' : 'eval-source-map',
    };
  };
