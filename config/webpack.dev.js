const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    port: 8044
  }
};
