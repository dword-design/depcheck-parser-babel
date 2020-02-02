import { parseSync } from '@babel/core'
import { readFileSync } from 'fs-extra'

export default babelConfig => filename =>
  parseSync(readFileSync(filename, 'utf8'), babelConfig)