import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { readFile } from 'node:fs'
import path from 'node:path'
import { createUnplugin } from 'unplugin'
import { parseMPVerifyFileRequest, resolveServeDir } from './internal/utils'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (
  options,
) => {
  const serveDir = options?.serveDir || 'node_modules'

  return {
    name: 'unplugin-mp-verify-file-serve',
    vite: {
      configureServer(server) {
        const viteServeDir = resolveServeDir(serveDir, server.config.root)

        server.middlewares.use((req, res, next) => {
          const file = parseMPVerifyFileRequest(req.originalUrl!)
          if (file) {
            const filePath = path.join(viteServeDir, file)

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
      // 获取 webpack 的工作目录（项目根目录）
      const webpackServeDir = resolveServeDir(
        serveDir,
        compiler.options.context,
      )

      compiler.hooks.beforeRun.tap('unplugin-mp-verify-file-serve', () => {
        // Webpack production build mode - no dev server
      })

      // Setup devServer middleware for development mode
      if (compiler.options.devServer) {
        // Middleware handler function
        const middlewareHandler = (req: any, res: any, next: any): void => {
          const file = parseMPVerifyFileRequest(req.url)
          if (file) {
            const filePath = path.join(webpackServeDir, file)

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

        // 通过 compiler.webpack.version 判断版本
        // Webpack 5+ 才有 compiler.webpack 对象
        const isWebpack5 = compiler.webpack && compiler.webpack.version

        if (isWebpack5) {
          // Webpack 5: setupMiddlewares API
          const setupMiddlewares = compiler.options.devServer.setupMiddlewares

          compiler.options.devServer.setupMiddlewares = (
            middlewares: any,
            devServer: any,
          ) => {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined')
            }

            devServer.app?.use(middlewareHandler)

            return setupMiddlewares
              ? setupMiddlewares(middlewares, devServer)
              : middlewares
          }
        }
        else {
          // Webpack 4: before hook
          const originalBefore = compiler.options.devServer.before

          compiler.options.devServer.before = (
            app: any,
            server: any,
            compiler: any,
          ) => {
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
