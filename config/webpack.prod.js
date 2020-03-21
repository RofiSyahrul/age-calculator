const path = require('path');

module.exports = {
  mode: 'production',
  devServer: {
    contentBase: './build',
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, '..', 'build')
  }
};
