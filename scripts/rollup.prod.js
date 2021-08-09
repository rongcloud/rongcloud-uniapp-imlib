const path = require('path')
const { execSync } = require('child_process')
const { babel } = require('@rollup/plugin-babel')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { terser } = require('rollup-plugin-terser')
const replace = require('@rollup/plugin-replace')
const { default: dts } = require('rollup-plugin-dts')
const del = require('rollup-plugin-delete')
const rollupTs = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')

const extensions = ['.js', '.ts']
const commitId = execSync('git rev-parse HEAD').toString().replace(/\s/g, '')

const resolve = (...args) => path.resolve(__dirname, '..', ...args)

const pkg = require('../package.json')
const attrs = pkg.__attrs__

const input = resolve('src/index.ts')

const banner = [
  '/*',
  ` * ${attrs.globals} - v${pkg.version}`,
  ` * CommitId - ${commitId}`,
  ` * ${new Date()}`,
  ' * ©2020 RongCloud, Inc. All rights reserved.',
  ' */'
].join('\n')

const consts = {
  __COMMIT_ID__: JSON.stringify(commitId),
  __VERSION__: JSON.stringify(pkg.version),
}

const plugins = [
  // delete 插件只能最初始位置执行一次
  del({ targets: 'dist/*' }),
  replace({ __DEV__: false, ...consts }),
  rollupTs({ sourceMap: false }),
  commonjs(),
  nodeResolve({ extensions, modulesOnly: true, resolveOnly: ['core-js'] }),
  babel({ exclude: 'node_modules/**', extensions, comments: false, babelHelpers: 'bundled' })
]
const isRelease = /^(\d+\.){2}\d+$/.test(pkg.version)
isRelease && plugins.push(terser())

module.exports = [
  {
    input,
    output: [
      { file: resolve(pkg.main), format: 'cjs', banner },
      { file: resolve(pkg.module), format: 'esm', banner }
    ],
    plugins
  },
  // d.ts
  {
    input,
    output: { file: resolve(pkg.types), format: 'esm', banner },
    plugins: [
      dts()
    ]
  }
]
