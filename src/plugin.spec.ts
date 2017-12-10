import test from 'ava'

import systemjs = require('systemjs')

test('description', async t => {
  systemjs.config({
    baseURL: 'node_modules',
    packageConfigPaths: [
      '@*/*/package.json',
      '*/package.json'
    ],
    map: {
      'app': './fixtures/jsx',
      'plugin-node': './dist-es5/plugin.js'
    },
    packages: {
      'app': {
        defaultExtension: false,
        meta: {
          '*': {
            loader: 'plugin-node',
            'nodeOptions': {
              'meta': {
                '*.ts': {
                  'loader': 'ts'
                }
              }
            }
          }
        }
      }
    }
  } as any)
  // const is = await systemjs.import('param-case')
  // console.log('is???', is)
  const index = await systemjs.import('./fixtures/jsx/index.js')
  t.is(index.foo(), 'foo')

})
