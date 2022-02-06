import type { Configuration } from 'webpack';
import webpackMerge from 'webpack-merge';

import commonConfig from './webpack.common';

const configFactory = async ({
  env,
}: Record<string, string>): Promise<Configuration> => {
  const imported: { default: Configuration } = await import(
    `./webpack.${env}`
  );
  const envConfig: Configuration = imported?.default;
  return webpackMerge(await commonConfig(), envConfig);
};

export default configFactory;
