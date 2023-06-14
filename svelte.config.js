import { vitePreprocess } from '@astrojs/svelte';
import autoprefixer from 'autoprefixer';

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import './src/styles/mixins.scss';`,
          },
        },
        postcss: {
          plugins: [autoprefixer()],
        },
      },
    },
  }),
};
