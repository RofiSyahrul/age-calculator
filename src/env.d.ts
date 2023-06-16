/// <reference types="astro/client" />
/// <reference types="chrome" />

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

type DeepPartial<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial<T[K]>;
    }
  : T;
