const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

            // HTML Webpack plugin to generate HTML file
            new HtmlWebpackPlugin({
              template: './index.html',
              filename: 'index.html',
              chunks: ['main']
            }),
            // Webpack PWA Manifest plugin for generating manifest.json
            new WebpackPwaManifest({
              name: 'J.A.T.E', // your app name
              short_name: 'J.A.T.E', // shorter version of your app name
              description: 'Just Another Text Editor',
              background_color: '#ffffff',
              theme_color: '#ffffff',
              icons: [
                {
                  src: path.resolve('src/images/logo.png'),
                  sizes: [96, 128, 192, 256, 384, 512], // multiple sizes for better compatibility
                  destination: path.join('assets', 'icons'),
                },
              ],
            }),
            // Workbox InjectManifest plugin for service worker
            new InjectManifest({
              swSrc: './src-sw.js',
              swDest: 'src-sw.js',
            }),
      
    ],

    module: {
      rules: [
        // Add CSS loaders and babel to webpack
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};