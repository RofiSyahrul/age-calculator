const WorkboxPlugin = require('workbox-webpack-plugin');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const buildDir = path.join(__dirname, '..', 'build');
if (fs.existsSync(buildDir)) {
  rimraf.sync(buildDir);
}

const serviceWorkerPlugin = new WorkboxPlugin.GenerateSW({
  skipWaiting: true
});

module.exports = {
  mode: 'production',
  plugins: [serviceWorkerPlugin],
  devServer: {
    contentBase: './build',
    historyApiFallback: true
  }
};
