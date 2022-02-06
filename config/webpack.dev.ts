import type { Configuration } from 'webpack';
import 'webpack-dev-server';

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 8045,
  },
};

export default devConfig;
