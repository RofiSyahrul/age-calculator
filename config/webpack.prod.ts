/* eslint-disable import/default */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration, WebpackPluginInstance } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import WorkboxPlugin from 'workbox-webpack-plugin';
import 'webpack-dev-server';

const isExtension = process.env.BUILD_ENV === 'extension';
const isAnalyze = process.env.ANALYZE === 'true';

const terser = new TerserPlugin({
  parallel: true,
  sourceMap: false,
  cache: true,
  terserOptions: { output: { comments: false }, sourceMap: false },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const copy = new CopyWebpackPlugin({
  patterns: [
    {
      from: 'public',
      filter: (filePath: string) => !filePath.endsWith('index.html'),
    },
  ],
});

const swPlugin = new WorkboxPlugin.GenerateSW({
  swDest: 'sw.js',
  clientsClaim: true,
  skipWaiting: true,
});

function getPlugins() {
  const plugins: WebpackPluginInstance[] = [copy];
  if (!isExtension) {
    plugins.push(swPlugin);
  }
  if (isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return plugins;
}

const prodConfig: Configuration = {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [terser as WebpackPluginInstance],
  },
  plugins: getPlugins(),
  devServer: {
    historyApiFallback: true,
  },
};

export default prodConfig;
