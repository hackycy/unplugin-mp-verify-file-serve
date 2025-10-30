import type { Options, ResolvedOptions } from '../types'
import path from 'node:path'
import process from 'node:process'
import { resolvedOptions } from './options'

const MP_FILE_PREFIX = 'MP_verify_'
const MP_FILE_SUFFIX = '.txt'

export class Context {
  options: ResolvedOptions
  root: string = process.cwd()

  constructor(readonly rawOptions: Options) {
    this.options = resolvedOptions(rawOptions, this.root)
  }

  setRoot(root: string): void {
    if (this.root === root) {
      return
    }

    this.root = root
    this.options = resolvedOptions(this.rawOptions, this.root)
  }

  parseMPVerifyFileRequest(url: string): string | null {
    if (!url) {
      return null
    }

    // parse filename from url, support query string and hash
    const pathname = url.split('?')[0].split('#')[0]
    const filename = pathname.split('/').pop()!

    // 默认MP验证文件格式：MP_verify_XXXXXX.txt
    if (filename.startsWith(MP_FILE_PREFIX) && filename.endsWith(MP_FILE_SUFFIX)) {
      return filename
    }
    // 自定义验证文件列表
    else if (this.options.serveFiles.includes(filename)) {
      return filename
    }

    return null
  }

  resolveFilePath(file: string): string {
    return path.join(this.options.serveDir, file)
  }
}
