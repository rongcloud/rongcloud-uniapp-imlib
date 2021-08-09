// require('./release')('npm run build:dev')
const { execSync } = require('child_process')

const runshell = (command, cwd) => {
  execSync(command, { stdio: 'inherit', cwd })
}

runshell('rm -rf dist release')

runshell('npm run build:dev')
