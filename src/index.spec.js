import { endent } from '@dword-design/functions'
import depcheck from 'depcheck'
import packageName from 'depcheck-package-name'
import outputFiles from 'output-files'
import withLocalTmpDir from 'with-local-tmp-dir'

import self from './index.js'

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
        'index.js': endent`
          import foo from 'foo'

          export default foo |> x => x * 2
        `,
      })

      const result = await depcheck('.', {
        package: {
          dependencies: {
            foo: '^1.0.0',
          },
        },
        parsers: {
          '**/*.js': self,
        },
      })
      expect(result.dependencies).toEqual([])
    }),
}
