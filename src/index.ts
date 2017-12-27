const log = hasDebugLog() ? console.debug : console.log

function isNode() {
  // use `module['e' + 'xports']` to avoid triggering failure in webpack during consumption.
  // webpack provides a fake `module`. Need to exclude it by checking `webpackPolyfill`
  // tslint:disable-next-line strict-type-predicates
  return typeof module !== 'undefined' && module['e' + 'xports'] && !module['webpackPolyfill']
}

function hasDebugLog() {
  if (isNode()) {
    let [major, minor] = process.version.split('.')
    if (major[0] === 'v') major = major.slice(1)
    const maj = parseInt(major, 10)
    const min = parseInt(minor, 10)
    return maj > 9 ||
      maj === 9 && min >= 3
  }

  return true
}

export function locate(load) {
  log('locating: ', load.address)

  const suffix = findMissingFileSuffix(this, getFilePath(load.address), getExtensions(load.metadata.nodeOptions))

  if (suffix) {
    const address = load.address + suffix
    log(`locate ${load.address} as ${address}`)
    load.address = address
    return address
  }

  log(`locate ${load.address}`)
}

function getFilePath(address) {
  const rawPath = address.slice(8)

  // for windows:
  // file:///C:/Users/...
  // for others:
  // file:///Users/...
  return rawPath[1] === ':' ? rawPath : '/' + rawPath
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
