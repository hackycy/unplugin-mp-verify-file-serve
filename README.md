# unplugin-mp-verify-file-serve

[![NPM version](https://img.shields.io/npm/v/unplugin-mp-verify-file-serve?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-mp-verify-file-serve)

在开发环境下进行微信开放平台的服务器域名校验文件访问，配合内网穿透在开发阶段进行公众号网页调试等

## Install

```bash
npm i unplugin-mp-verify-file-serve
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import MPVerifyFileServe from 'unplugin-mp-verify-file-serve/vite'

export default defineConfig({
  plugins: [
    MPVerifyFileServe({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import MPVerifyFileServe from 'unplugin-mp-verify-file-serve/rollup'

export default {
  plugins: [
    MPVerifyFileServe({ /* options */ }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-mp-verify-file-serve/webpack')({ /* options */ })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-mp-verify-file-serve/nuxt', { /* options */ }],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

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

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import MPVerifyFileServe from 'unplugin-mp-verify-file-serve/esbuild'

build({
  plugins: [MPVerifyFileServe()],
})
```

<br></details>
