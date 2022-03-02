import { readFile, writeFile } from 'fs/promises';

import { manifest as manifestConfig } from '../../src/config';
import { manifestPath } from './_paths';
const { icons } = manifestConfig;

type ManifestForExtension = {
  manifest_version: number;
  icons: Record<number, string>;
  chrome_url_overrides: { newtab: string };
  permissions: string[];
  browser_action: Record<string, unknown>;
  content_security_policy: string;
  content_scripts: Array<{ matches: string[]; js: string[] }>;
  theme_color?: string;
  background_color?: string;
  start_url?: string;
  display?: string;
};

export default async function buildManifest(params: {
  jsFiles: string[];
}) {
  const manifestJson =
    (await readFile(manifestPath, {
      encoding: 'utf8',
    })) || '{}';

  const manifest: ManifestForExtension = JSON.parse(manifestJson);

  manifest.manifest_version = 2;
  manifest.icons = { 192: icons[0].src, 512: icons[1].src };
  manifest.chrome_url_overrides = { newtab: 'index.html' };
  manifest.permissions = ['storage'];
  manifest.browser_action = {};
  manifest.content_security_policy =
    "script-src 'self' 'sha256-FyiKpy3PpN1/MM6lBhmjdt7P5PXAcmjHEWQr2bhYhkk='; style-src 'self' 'unsafe-inline'; object-src 'self'; img-src 'self' data:; default-src 'self' 'unsafe-inline'";
  manifest.content_scripts = [
    {
      matches: ['http://google.com/*', 'https://google.com/*'],
      js: params.jsFiles,
    },
  ];
  delete manifest.theme_color;
  delete manifest.background_color;
  delete manifest.start_url;
  delete manifest.display;

  await writeFile(
    manifestPath,
    JSON.stringify(manifest, null, 2),
    'utf8',
  );
}
