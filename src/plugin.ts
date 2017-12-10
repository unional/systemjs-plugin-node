// import isWindows = require('is-windows')
export function locate(_load) {
  console.log('called locate')
  // const filePath = getFilePath(load.address)
  console.log(this._nodeRequire('fs')
  // console.log(load)
}

// export function fetch(load) {
//   console.log('fetch', load)
//   return Promise.resolve({})
// }

// export function translate(load) {
//   console.log('translate', load)
//   return Promise.resolve({})
// }

// function getFilePath(address: string) {
//   // slice(7): trim 'file://' + '/Users/x/y/z'
//   // slice(8): trime 'file:///' + 'C:/Users/...'
//   // istanbul ignore next
//   return isWindows() ? address.slice(8) : address.slice(7)
// }
