const { execSync } = require('child_process')

const runshell = (command, cwd) => {
  execSync(command, { stdio: 'inherit', cwd })
}

const pkg = require('../package.json')
// const commitId = execSync('git rev-parse HEAD').toString().replace(/\s/g, '')

const npmRelease = 'release/npm'

module.exports = (compiler) => {
  // 清除历史构建内容
  runshell('rm -rf dist release')

  // 编译
  runshell(compiler);

  // 预发布前的资源整理，最终:
  // 发布 release/npm 目录内容到 npm 仓库

  // release/npm 资源拷贝
  (() => {
    runshell(`mkdir -p ${npmRelease}`)
    pkg.files.forEach(item => {
      runshell(`cp -r ${item} ${npmRelease}/${item}`)
    })

    delete pkg.private
    delete pkg.devDependencies
    delete pkg.scripts
    // pkg.__commit__ = commitId

    // 覆盖 README.md
    runshell(`cp -r INTRODUCTION.md ${npmRelease}/README.md`)
    runshell(`echo '${JSON.stringify(pkg, null, '  ')}' > ${npmRelease}/package.json`)
  })()
}
