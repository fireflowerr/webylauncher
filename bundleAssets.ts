/**
 * Script executes equivalent cp -r ./assets ./build
 */

import {
  PathLike,
  copyFileSync,
  statSync,
  rmSync,
  existsSync,
  mkdirSync,
  readdirSync,
} from 'fs';
import {basename, join} from 'path';

const assetsPath = join(__dirname, 'assets');
const buildPath = join(__dirname, 'build');

/**
 * Checks if path is a directory.
 *
 * @param path to check
 * @returns true if directory
 */
const isDirectory = (path: PathLike): boolean => {
  const stats = statSync(path);
  return stats.isDirectory();
};

/**
 * cp -r source target
 *
 * @param source to copy
 * @param target destination
 */
const copyFileRecursive = (source: PathLike, target: PathLike): void => {
  const dest = join(target.toString(), basename(source.toString()));
  if (existsSync(dest) && !isDirectory(dest)) {
    rmSync(dest);
  }

  if (isDirectory(source)) {
    if (!existsSync(dest)) {
      mkdirSync(dest);
    }

    for (const subPath of readdirSync(source)) {
      copyFileRecursive(join(source.toString(), subPath), dest);
    }
    return;
  }

  copyFileSync(source, dest);
};

copyFileRecursive(assetsPath, buildPath);
