export interface Options {
  /**
   * 微信小程序验证文件服务存放目录
   *
   * @default 'node_modules'
   */
  serveDir?: string

  /**
   * 需要访问验证文件列表
   */
  serveFiles?: string[]
}

export type ResolvedOptions = Required<Options>
