export function locate(load) {
  const isWindows = this._nodeRequire('is-windows')
  if (isWindows())
    return locateForWindows(this, load)
  else
    return locateForOtherOS(this, load)
}
function locateForWindows(systemjs, load) {
  const extensions = getExtensions(load.metadata.nodeOptions)
  // slice(8): trim 'file:///' + 'C:/Users/...'
  const suffix = findMissingFileSuffix(systemjs, load.address.slice(8), extensions)
  return updateAddressIfNeeded(systemjs, load, suffix)
}
function locateForOtherOS(systemjs, load) {
  const extensions = getExtensions(load.metadata.nodeOptions)

  // slice(7): trim 'file://' + '/Users/x/y/z'
  const suffix = findMissingFileSuffix(systemjs, load.address.slice(7), extensions)
  return updateAddressIfNeeded(systemjs, load, suffix)
}
function findMissingFileSuffix(systemjs, givenFilePath, extensions) {
  const fs = systemjs._nodeRequire('fs')
  if (fs.existsSync(givenFilePath)) {
    if (fs.statSync(givenFilePath).isDirectory()) {
      const ext = findExtension(fs, extensions, givenFilePath + '/index')
      return ext ? '/index' + ext : undefined
    }
    else
      return undefined
  }
  else
    return findExtension(fs, getExtensions(systemjs.getConfig().transpiler), givenFilePath)
}
function findExtension(fs, extensions, filePath) {
  return extensions.find(ext => {
    const path = filePath + ext
    return fs.existsSync(path)
  })
}

function getExtensions(nodeOptions): string[] {
  return nodeOptions && nodeOptions.extensions || ['.js', '.jsx']
}

function updateAddressIfNeeded(systemjs, load, suffix) {
  const log = systemjs._nodeRequire('@unional/logging').getLogger('systemjs-plugin-node')
  if (suffix) {
    const address = load.address + suffix
    log.debug(`locate ${load.address} as ${address}`)
    load.address = address
    return address
  }
  else {
    log.debug(`locate ${load.address}`)
  }
}
