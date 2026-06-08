import { existsSync } from 'fs';
import { dirname, join } from 'path';

const PROBE = 'auth.proto';

/** Walk up from `start`, returning the first ancestor-joined `rel` that contains the proto files. */
function findUp(start: string, rel: string): string | null {
  let dir = start;
  for (let i = 0; i < 10; i++) {
    const candidate = join(dir, rel);
    if (existsSync(join(candidate, PROBE))) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

// Locate the directory holding the `.proto` files at runtime, independent of
// the process CWD and of whether the consuming app runs from TypeScript source
// (dev) or a webpack bundle (dist). Order matters: prefer files shipped next to
// the bundle, then the monorepo source, then the source copied into an image.
const candidates = [
  join(__dirname, 'protos'), //                 protos copied beside a bundle (dist/protos)
  __dirname, //                                 running from the source protos dir (dev)
  findUp(__dirname, 'packages/common/src/protos'),
  findUp(process.cwd(), 'packages/common/src/protos'),
  join(process.cwd(), 'protos'),
].filter((d): d is string => !!d);

export const PROTOS_DIR =
  candidates.find((dir) => existsSync(join(dir, PROBE))) ?? __dirname;

/** Absolute path to a proto file shipped with @app/common. */
export const getProtoPath = (file: string): string => join(PROTOS_DIR, file);
