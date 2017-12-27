import { test } from 'ava'
import systemjs = require('systemjs')

function configSystemjs(fixturePath: string) {
  systemjs.config({
    map: {
      'systemjs-plugin-node': require.resolve('../dist-es5/index.js'),
      app: fixturePath
    },
    packages: {
      app: {
        defaultExtension: false,
        meta: {
          '*': {
            loader: 'systemjs-plugin-node'
          }
        }
      }
    }
  })
}

test('fixture/single', async t => {
  configSystemjs('./fixtures/single')
  const foo = await systemjs.import('./fixtures/single/foo')
  t.is(foo(), 'foo')
})

test.only('fixture/redirect', async t => {
  configSystemjs('./fixtures/redirect')
  const foo = await systemjs.import('./fixtures/redirect/index')
  t.is(foo(), 'foo')
})
