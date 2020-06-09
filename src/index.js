import { parseSync } from '@babel/core'
import { readFileSync } from 'fs-extra'

export default filename =>
  parseSync(readFileSync(filename, 'utf8'), { filename })
