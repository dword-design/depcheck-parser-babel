import * as babel from '@babel/core'
import { readFile } from 'fs-extra'

export default async filename =>
  babel.parse(await readFile(filename, 'utf8'), { filename })
