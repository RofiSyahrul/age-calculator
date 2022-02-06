declare module 'preload-webpack-plugin' {
  import type { Compiler } from 'webpack';

  class PreloadWebpackPlugin {
    constructor(options: Record<string, unknown>);
    apply(compiler: Compiler): void;
  }

  export default PreloadWebpackPlugin;
}
