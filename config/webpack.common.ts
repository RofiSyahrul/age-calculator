import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
import { DefinePlugin } from 'webpack';
import type { Configuration } from 'webpack';

import { alias, entry, root, src, build } from '../.paths';
import { keywords } from '../package.json';
import { manifest } from './config';
import { fetchSpecialData } from './supabase';

const { name, description, theme_color } = manifest;

const isExtension = process.env.BUILD_ENV === 'extension';
const viewport =
  'width=device-width, initial-scale=1.0, maximum-scale=5.0';

const title = isExtension ? 'New Tab' : 'Calculate your age';
const favicon = './public/rho-pi.ico';
const url = 'https://calculate-your-age.netlify.app';
const ogImage =
  'https://avatars1.githubusercontent.com/u/44445726?s=460&u=7226c3b6d6e2d2163dd0eab652c20aaba6775755&v=4';

const htmlPlugin = new HtmlWebpackPlugin({
  title,
  favicon,
  template: './public/index.html',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
  },
  meta: {
    viewport,
    description,
    author: 'Rofi',
    image: ogImage,
    keywords: `${keywords.join(', ')}, ${title}`,
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': name,
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-touch-icon': '/rho-pi.ico',
    'application-name': name,
    'theme-color': theme_color,
    'msapplication-TileColor': theme_color,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': ogImage,
    'twitter:creator': '@RofiSyahrul',
    'twitter:dnt': 'on',
    'twitter:card': 'summary_large_image',
    ...(!isExtension && {
      'google-site-verification':
        'NUXK5NcVGFp_nAVVgvjMZYHSC2ZvTsva-XCCzJ85hvA',
    }),
  },
  templateParameters: {
    description,
    title,
    url,
    ogImage,
    favicon: '/rho-pi.ico',
    themeColor: theme_color,
  },
});

const commonConfig = async (): Promise<Configuration> => ({
  entry,
  context: root,
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              context: root,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['react-app', { flow: false, typescript: true }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/image/[ext]/[name].[ext]',
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          prefix: 'fonts',
          name: 'fonts/[name].[ext]',
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [src, 'node_modules'],
    alias,
  },
  plugins: [
    new CleanWebpackPlugin(),
    htmlPlugin,
    new DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      IS_EXTENSION: isExtension,
      SPECIAL: (await fetchSpecialData()) as never,
    }),
    new PreloadWebpackPlugin({ rel: 'preload', include: 'initial' }),
    new ESLintPlugin({ extensions: ['.ts', '.tsx', '.js'] }),
  ],
  output: {
    path: build,
    publicPath: '/',
    filename: 'js/[name]-[hash].js',
    chunkFilename: 'js/[name].js',
  },
});

export default commonConfig;
