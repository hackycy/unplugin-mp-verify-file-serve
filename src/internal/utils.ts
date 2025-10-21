import path from 'node:path'
import process from 'node:process'

const MP_FILE_PREFIX = 'MP_verify_'
const MP_FILE_SUFFIX = '.txt'

export function resolveServeDir(serveDir: string): string {
  if (path.isAbsolute(serveDir)) {
    return serveDir
  }

  return path.resolve(process.cwd(), serveDir)
}

export function parseMPVerifyFileRequest(url: string): string | null {
  if (!url) {
    return null
  }

  // parse filename from url, support query string and hash
  const pathname = url.split('?')[0].split('#')[0]
  const filename = pathname.split('/').pop()!

  if (filename.startsWith(MP_FILE_PREFIX) && filename.endsWith(MP_FILE_SUFFIX)) {
    return filename
  }

  return null
}
