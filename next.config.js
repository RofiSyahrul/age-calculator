const { readdirSync, unlinkSync } = require('fs');
const path = require('path');

const env = require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');

const pkg = require('./package.json');

const isAnalyze = process.env.ANALYZE === 'true';
const isProd = process.env.NODE_ENV === 'production';
const isExtension = process.env.BUILD_ENV === 'extension';

// eslint-disable-next-line prettier/prettier
let withBundleAnalyzer = () => () => { };
if (isAnalyze) {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isExtension ? '/js' : '',
  compiler: {
    styledComponents: true,
  },
  env,
  eslint: {
    ignoreDuringBuilds: true,
  },
  excludeDefaultMomentLocales: true,
  reactStrictMode: true,
  swcMinify: false,
  webpack(config, { webpack, dev }) {
    config.plugins?.push(
      new webpack.DefinePlugin({
        __DEV__: dev,
        APP_URL: JSON.stringify(pkg.homepage),
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        IS_EXTENSION: isExtension,
        REPOSITORY_URL: JSON.stringify(pkg.repository.url),
      }),
    );
    return config;
  },
};

const isPWADisabled = !isProd || isExtension;

if (isPWADisabled) {
  const publicPath = path.join(__dirname, 'public');
  const publicDirFiles = readdirSync(publicPath);
  const swWorkboxFileRegExp = /^sw|workbox-[a-z1-9]+\.js$/;
  publicDirFiles.forEach(fileName => {
    if (swWorkboxFileRegExp.test(fileName)) {
      unlinkSync(path.join(publicPath, fileName));
    }
  });
}

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [
      withPWA,
      {
        pwa: {
          disable: isPWADisabled,
          dest: 'public',
          buildExcludes: [/middleware-manifest\.json$/],
        },
      },
    ],
  ],
  nextConfig,
);
