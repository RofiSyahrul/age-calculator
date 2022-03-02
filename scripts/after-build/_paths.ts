import path from 'path';

export const archiveDir = path.resolve(process.cwd(), 'archive');
export const buildDir = path.resolve(process.cwd(), 'build');
export const outDir = path.resolve(process.cwd(), 'out');
export const manifestPath = path.join(buildDir, 'manifest.json');
export const assetDirRelativePath = '/assets';
export const assetOutDir = path.join(outDir, assetDirRelativePath);
export const assetDir = path.join(buildDir, assetDirRelativePath);
export const jsDirRelativePath = '/_next/static';
export const jsDirBuildRelativePath = `/js${jsDirRelativePath}`;
export const jsOutDir = path.join(outDir, jsDirRelativePath);
export const jsDir = path.join(buildDir, jsDirBuildRelativePath);
export const readmePath = path.resolve(process.cwd(), './README.md');
