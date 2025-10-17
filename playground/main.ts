// @ts-expect-error - import.meta.env is available in Vite
const buildTool = typeof import.meta.env !== 'undefined' ? 'Vite' : 'Webpack'

document.getElementById('app')!.innerHTML = `
  <p>✅ 开发环境运行中</p>
  <p>🔧 构建工具: <strong>${buildTool}</strong></p>
  <p>🔌 <strong>unplugin-mp-verify-file-serve</strong> 已加载</p>
`

// eslint-disable-next-line no-console
console.log(`Playground loaded with ${buildTool}!`)
