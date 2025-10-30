import type { Options, ResolvedOptions } from '../types'
import path from 'node:path'

export const defaultOptions: Required<Options> = {
  serveDir: 'node_modules',
  serveFiles: [],
}

export function resolvedOptions(rawOptions: Options, root: string): ResolvedOptions {
  const resolved = Object.assign({}, defaultOptions, rawOptions) as ResolvedOptions

  if (!path.isAbsolute(resolved.serveDir)) {
    resolved.serveDir = path.resolve(root, resolved.serveDir)
  }

  return resolved
}
