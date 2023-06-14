import pkg from '../package.json';

interface Icon {
  src: string;
  sizes: string;
  type: string;
}

interface WebAppManifest {
  short_name: string;
  name: string;
  description: string;
  version: string;
  theme_color: string;
  background_color: string;
  start_url: string;
  display: string;
  icons: Icon[];
}

interface ExtensionManifest
  extends Pick<
    WebAppManifest,
    'description' | 'name' | 'short_name' | 'version'
  > {
  chrome_url_overrides: { newtab: string };
  content_scripts: Array<{ matches: string[]; js: string[] }>;
  content_security_policy: {
    extension_pages: string;
  };
  default_locale: string;
  icons: Record<string, string>;
  manifest_version: number;
  permissions: string[];
}

export const REPOSITORY_URL = pkg.repository.url;
export const IS_EXTENSION = process.env.BUILD_MODE === 'extension';

export const webAppManifest: WebAppManifest = {
  short_name: 'Age Calculator and Updater',
  name: 'Age Calculator and Updater by Rofi',
  description: pkg.description,
  version: pkg.version,
  theme_color: '#28476c',
  background_color: '#151f22',
  start_url: '.',
  display: 'standalone',
  icons: [
    {
      src: 'assets/manifest-icon-192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'assets/manifest-icon-512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
};

export const extensionManifest: ExtensionManifest = {
  short_name: webAppManifest.short_name,
  name: webAppManifest.name,
  description: webAppManifest.description,
  version: pkg.version,
  default_locale: 'en',
  chrome_url_overrides: {
    newtab: 'index.html',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: [],
    },
  ],
  content_security_policy: {
    extension_pages:
      "script-src 'self'; style-src 'self' 'unsafe-inline'; object-src 'self'; img-src 'self' data:; default-src 'self' 'unsafe-inline'",
  },
  icons: {
    '192': webAppManifest.icons[0].src,
    '512': webAppManifest.icons[1].src,
  },
  manifest_version: 3,
  permissions: ['storage'],
};
