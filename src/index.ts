import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { readFile } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createUnplugin } from 'unplugin'

function resolveServeDir(serveDir: string): string {
  if (path.isAbsolute(serveDir)) {
    return serveDir
  }

  return path.resolve(process.cwd(), serveDir)
}

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const serveDir = resolveServeDir(options?.serveDir || 'node_modules')

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
    webpack(compiler) {
      compiler.hooks.beforeRun.tap('unplugin-mp-verify-file-serve', () => {
        // Webpack production build mode - no dev server
      })

      // Setup devServer middleware for development mode
      if (compiler.options.devServer) {
        // Middleware handler function
        const middlewareHandler = (req: any, res: any, next: any): void => {
          if (
            req.url?.startsWith('/MP_')
            && req.url.endsWith('.txt')
          ) {
            const filePath = path.join(
              serveDir,
              req.url,
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
        }

        // 获取WebPack版本
        const webpackVersion = Number.parseInt(compiler.webpack.version.split('.')[0])

        // Webpack 5: setupMiddlewares API
        if (webpackVersion >= 5) {
          const setupMiddlewares = compiler.options.devServer.setupMiddlewares

          compiler.options.devServer.setupMiddlewares = (middlewares: any, devServer: any) => {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined')
            }

            devServer.app?.use(middlewareHandler)

            return setupMiddlewares ? setupMiddlewares(middlewares, devServer) : middlewares
          }
        }
        // Webpack 4: before hook
        else {
          const originalBefore = compiler.options.devServer.before

          compiler.options.devServer.before = (app: any, server: any, compiler: any) => {
            app.use(middlewareHandler)

            if (originalBefore) {
              originalBefore(app, server, compiler)
            }
          }
        }
      }
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
