import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { readFile } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createUnplugin } from 'unplugin'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const serveDir = options?.serveDir || 'node_modules'

  return {
    name: 'unplugin-mp-verify-file-serve',
    vite: {
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (
            req.originalUrl?.startsWith('/MP_')
            && req.originalUrl.endsWith('.txt')
          ) {
            const filePath = path.join(
              process.cwd(),
              serveDir,
              req.originalUrl,
            )
            readFile(filePath, 'utf-8', (err, data) => {
              if (err) {
                res.statusCode = 500
                res.end('Internal Server Error')
              }
              else {
                res.setHeader('Content-Type', 'text/plain')
                res.end(data)
              }
            })
          }
          else {
            next()
          }
        })
      },
    },
    webpack(_compiler) {
      // TODO
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
