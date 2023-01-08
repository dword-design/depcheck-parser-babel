import * as babel from '@babel/core'
import fs from 'fs-extra'

export default async filename =>
  babel.parse(await fs.readFile(filename, 'utf8'), { filename })
