import withLocalTmpDir from 'with-local-tmp-dir'
import outputFiles from 'output-files'
import { endent } from '@dword-design/functions'
import { spawn } from 'child-process-promise'
import getPackageName from 'get-package-name'

export default () => withLocalTmpDir(__dirname, async () => {
  await outputFiles({
    'depcheck.config.js': endent`
      const getDepcheckBabelParser = require('@dword-design/get-depcheck-babel-parser')

      module.exports = {
        parsers: {
          '*.js': getDepcheckBabelParser({
            presets: [
              ['${getPackageName(require.resolve('@babel/preset-env'))}', { targets: { node: 10 } }],
            ],
            plugins: [
              ['${getPackageName(require.resolve('@babel/plugin-proposal-pipeline-operator'))}', { proposal: 'fsharp' }],
            ],
          }),
        }
      }
    `,
    'index.js': endent`
      import foo from 'foo'

      export default foo |> x => x * 2
    `,
    'package.json': JSON.stringify({
      dependencies: {
        '@dword-design/get-depcheck-babel-parser': '^1.0.0',
        foo: '^1.0.0',
      },
    }),
  })
  await spawn('depcheck', ['--config', 'depcheck.config.js', '.'])
})
