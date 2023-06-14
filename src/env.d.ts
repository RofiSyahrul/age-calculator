/// <reference types="astro/client" />

interface InjectedMetaEnv {
  readonly APP_VERSION: string;
  readonly APP_NAME: string;
  readonly DESCRIPTION: string;
  readonly IS_EXTENSION: boolean;
  readonly REPOSITORY_URL: string;
  readonly THEME_COLOR: string;
}

interface ImportMetaEnv extends InjectedMetaEnv {
  readonly BUILD_MODE: 'extension' | 'default';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
