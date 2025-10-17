# Playground

这是 `unplugin-mp-verify-file-serve` 的测试环境，支持 Vite 和 Webpack 两种构建工具。

## 安装依赖

在项目根目录运行：

```bash
pnpm install
```

## 使用 Vite 运行（默认）

```bash
pnpm dev
# 或
pnpm dev:vite
```

访问：http://localhost:5173

## 使用 Webpack 运行

```bash
pnpm dev:webpack
```

访问：http://localhost:9000

## 测试验证文件访问

1. 在项目根目录的 `node_modules` 文件夹下创建测试文件：

```bash
# 在项目根目录执行
echo "test content for mp verify" > node_modules/MP_verify_test.txt
```

2. 在浏览器中访问对应的开发服务器

3. 点击页面上的"测试访问"按钮

4. 或者直接访问验证文件：
   - Vite: http://localhost:5173/MP_verify_test.txt
   - Webpack: http://localhost:9000/MP_verify_test.txt

## 功能说明

该插件会拦截所有以 `/MP_` 开头且以 `.txt` 结尾的请求，并从配置的 `serveDir` 目录中读取对应的文件。

这对于在开发环境下进行微信开放平台的服务器域名校验非常有用。

## 配置

可以在对应的配置文件中修改 `serveDir` 选项：

- Vite: `vite.config.ts`
- Webpack: `webpack.config.cjs`

```typescript
Unplugin({
  serveDir: 'node_modules', // 默认值
})
```
