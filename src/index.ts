import SystemJS = require('systemjs')
import chalk from 'chalk'
const oldImport = SystemJS.import
SystemJS.import = function (moduleName: string, normalizedParentName?: string) {
  console.log(chalk.green(`injected: ${moduleName}, ${normalizedParentName}`))
  return oldImport.call(SystemJS, moduleName, normalizedParentName)
}

export = SystemJS
