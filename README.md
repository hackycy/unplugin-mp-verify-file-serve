# unplugin-mp-verify-file-serve

[![NPM version](https://img.shields.io/npm/v/unplugin-mp-verify-file-serve?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-mp-verify-file-serve)

在开发环境中提供微信开放平台服务器域名校验文件的访问，配合内网穿透可方便地进行公众号网页调试。

> 仅在开发模式（本地调试）下生效

## Install

```bash
npm i unplugin-mp-verify-file-serve
```

**Options**

``` ts
export interface Options {
  /**
   * 微信小程序验证文件服务存放目录
   *
   * @default 'node_modules'
   */
  serveDir?: string
}
```

<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import MPVerifyFileServe from 'unplugin-mp-verify-file-serve/vite'

export default defineConfig({
  plugins: [
    MPVerifyFileServe({ /* options */ }),
  ],
})
```
</details>

<details>
<summary>Webpack</summary>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-mp-verify-file-serve/webpack')({ /* options */ })
  ]
}
```
</details>

<details>
<summary>Nuxt</summary>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-mp-verify-file-serve/nuxt', { /* options */ }],
  ],
})
```
</details>

<details>
<summary>Vue CLI</summary>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-mp-verify-file-serve/webpack')({ /* options */ }),
    ],
  },
}
```

> 注意在uniapp(hbuilderx)项目中使用时，由于uniapp的webpack context指向非项目目录，路径需要提供绝对路径
</details>

## Example

- [vite](./playground/play-vite)
- [webpack](./playground/play-webpack)
