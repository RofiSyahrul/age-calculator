import {
  access,
  copyFile,
  mkdir,
  readdir,
  rm,
  stat,
} from 'fs/promises';
import path from 'path';

import {
  assetDir,
  assetOutDir,
  buildDir,
  jsDir,
  jsDirRelativePath,
  jsOutDir,
  outDir,
} from './_paths';

const excluded =
  /(^404\.html|^google[a-f0-9]+\.html|_error-[a-f0-9]+\.js)$/;

async function readDir(dir: string): Promise<string[]> {
  const children = await readdir(dir);

  const promises = children.map(async child => {
    const absoluteChildPath = path.join(dir, child);
    const status = await stat(absoluteChildPath);
    if (status.isDirectory()) {
      return readDir(absoluteChildPath);
    }
    return absoluteChildPath;
  });

  const fileNames = await Promise.all(promises);
  return fileNames.flat();
}

async function accessOrCreateDir(dir: string) {
  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
}

async function accessBuildDir() {
  try {
    await access(buildDir);
    await rm(buildDir, { recursive: true });
    await mkdir(buildDir);
  } catch {
    await mkdir(buildDir);
  }
}

function createCopyFileHandler(
  rootSourceDir: string,
  rootTargetDir: string,
) {
  return async (fileName: string) => {
    if (excluded.test(fileName)) return;
    const filePath = path.join(rootSourceDir, fileName);
    const status = await stat(filePath);
    if (status.isDirectory()) return;
    const targetPath = path.join(rootTargetDir, fileName);
    try {
      await copyFile(filePath, targetPath);
    } catch {
      const dir = path.dirname(targetPath);
      await mkdir(dir, { recursive: true });
      await copyFile(filePath, targetPath);
    }
  };
}

export default async function buildExtension() {
  await accessBuildDir();
  await accessOrCreateDir(assetDir);
  const [outDirContents, assetDirContents] = await Promise.all(
    [outDir, assetOutDir].map(dir => readdir(dir)),
  );

  const copyOutDirPromises = outDirContents.map(
    createCopyFileHandler(outDir, buildDir),
  );

  const copyAssetDirPromises = assetDirContents.map(
    createCopyFileHandler(assetOutDir, assetDir),
  );

  await Promise.all([...copyOutDirPromises, ...copyAssetDirPromises]);

  const rawJSFilePaths = await readDir(jsOutDir);
  const jsFilePaths = rawJSFilePaths
    .filter(filePath => !excluded.test(filePath))
    .map(filePath => {
      const relativePathIndex = filePath.indexOf(jsDirRelativePath);
      return filePath.substring(relativePathIndex);
    });

  await accessOrCreateDir(jsDir);
  await Promise.all(
    jsFilePaths.map(
      createCopyFileHandler(outDir, path.join(buildDir, 'js')),
    ),
  );

  await rm(outDir, { recursive: true });
  await rm(path.resolve(process.cwd(), '.next'), { recursive: true });

  return { jsFiles: jsFilePaths.map(filePath => '/js' + filePath) };
}
