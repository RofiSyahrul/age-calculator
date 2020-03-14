const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Critters = require('critters-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const uglifyjs = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true,
  uglifyOptions: {
    output: {
      comments: false
    }
  }
});

const optimizeCssPlugin = new OptimizeCSSAssetsPlugin({});

module.exports = {
  optimization: {
    minimizer: [uglifyjs, optimizeCssPlugin]
  },
  entry: ['babel-polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'static/media/image/[ext]/[name].[ext]'
        }
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/image/svg/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader?prefix=fonts/',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.md$/,
        exclude: [/node_modules/, /readme/i],
        use: ['html-loader', 'markdown-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    alias: {
      src: path.join(__dirname, '../src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'New Tab',
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new Critters({
      preload: 'swap',
      fonts: true
    }),
    new CopyWebpackPlugin([{ from: 'public' }])
  ],
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    publicPath: '/',
    filename: 'js/bundle.js',
    chunkFilename: 'js/[name].js'
  }
};
