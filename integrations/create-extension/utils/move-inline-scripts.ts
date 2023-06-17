import fsp from 'fs/promises';
import path from 'path';

import { parse } from 'node-html-parser';

export async function moveInlineScripts(distDir: URL) {
  console.log(`Moving inline scripts with node-html-parser...`);

  const htmlFilePath = path.resolve(distDir.pathname, 'index.html');
  const htmlRaw = await fsp.readFile(htmlFilePath, 'utf8');
  const html = parse(htmlRaw);
  const head = html.querySelector('head');

  if (!head) return;

  const inlineScripts = html
    .getElementsByTagName('script')
    .filter(
      script => !script.hasAttribute('src') && script.innerText,
    );

  const assetPaths = await Promise.all(
    inlineScripts.map(async (script, index) => {
      const assetPath = `/js/_astro-${index + 1}.js`;
      await fsp.writeFile(
        path.join(distDir.pathname, assetPath),
        script.innerText,
        'utf8',
      );
      script.remove();
      return assetPath;
    }),
  );

  assetPaths.forEach(assetPath => {
    const existingNonInlineScript = head
      .getElementsByTagName('script')
      .slice(-1)[0];

    if (!existingNonInlineScript) return;

    existingNonInlineScript.insertAdjacentHTML(
      'afterend',
      `<script src="${assetPath}"></script>`,
    );
  });

  await fsp.writeFile(htmlFilePath, html.toString(), 'utf8');

  console.log(
    `Inline scripts moved to dist dir: ${assetPaths.join(', ')}`,
  );
}
