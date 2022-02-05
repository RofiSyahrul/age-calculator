const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isExtension = process.env.BUILD_ENV === 'extension';
const isAnalyze = process.env.ANALYZE === 'true';

const terser = new TerserPlugin({
  parallel: true,
  sourceMap: false,
  cache: true,
  terserOptions: { output: { comments: false }, sourceMap: false },
});

const copy = new CopyWebpackPlugin({
  patterns: [
    {
      from: 'public',
      filter: filePath => !filePath.endsWith('index.html'),
    },
  ],
});

const swPlugin = new WorkboxPlugin.GenerateSW({
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true,
});

function getPlugins() {
  const plugins = [copy];
  if (!isExtension) {
    plugins.push(swPlugin);
  }
  if (isAnalyze) {
    const BundleAnalyzerPlugin =
      require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [terser],
  },
  plugins: getPlugins(),
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
  },
};
