import { endent } from '@dword-design/functions'
import packageName from 'depcheck-package-name'
import execa from 'execa'
import outputFiles from 'output-files'
import withLocalTmpDir from 'with-local-tmp-dir'

export default {
  valid: () =>
    withLocalTmpDir(async () => {
      await outputFiles({
        '.babelrc.json': JSON.stringify({
          plugins: [
            [
              packageName`@babel/plugin-proposal-pipeline-operator`,
              { proposal: 'fsharp' },
            ],
          ],
          presets: [
            [packageName`@babel/preset-env`, { targets: { node: 10 } }],
          ],
        }),
        'depcheck.config.js': endent`
        const parser = require('../src/')

        module.exports = {
          parsers: {
            '*.js': parser,
          }
        }
      `,
        'index.js': endent`
        import foo from 'foo'

        export default foo |> x => x * 2
      `,
        'package.json': JSON.stringify({
          dependencies: {
            foo: '^1.0.0',
          },
        }),
      })
      await execa.command('depcheck --config depcheck.config.js')
    }),
}
