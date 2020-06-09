<!-- TITLE/ -->
# depcheck-babel-parser
<!-- /TITLE -->

<!-- BADGES/ -->
[![NPM version](https://img.shields.io/npm/v/depcheck-babel-parser.svg)](https://npmjs.org/package/depcheck-babel-parser)
![Linux macOS Windows compatible](https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue)

[![Build status](https://img.shields.io/github/workflow/status/dword-design/depcheck-babel-parser/build)](https://github.com/dword-design/depcheck-babel-parser/actions)
[![Coverage status](https://img.shields.io/coveralls/dword-design/depcheck-babel-parser)](https://coveralls.io/github/dword-design/depcheck-babel-parser)
[![Dependency status](https://img.shields.io/david/dword-design/depcheck-babel-parser)](https://david-dm.org/dword-design/depcheck-babel-parser)
![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/dword-design/depcheck-babel-parser)
<!-- /BADGES -->

<!-- DESCRIPTION/ -->

<!-- /DESCRIPTION -->

<!-- INSTALL/ -->
# Install

```bash
# NPM
$ npm install depcheck-babel-parser

# Yarn
$ yarn add depcheck-babel-parser
```
<!-- /INSTALL -->

## Usage

Start by creating a `.babelrc.json` file with your babel config, if needed.

Custom parsers are currently only supported when using `depcheck` via the Node.js API. Simply add the parser to your parser config and run depcheck:

```js
import depcheck from 'depcheck'
import babelParser from 'depcheck-babel-parser'

const options = {
  parsers: {
    '*.js': babelParser,
  },
}

depcheck('/path/to/your/project', options, (unused) => {
  console.log(unused.dependencies); // an array containing the unused dependencies
  console.log(unused.devDependencies); // an array containing the unused devDependencies
  console.log(unused.missing); // a lookup containing the dependencies missing in `package.json` and where they are used
  console.log(unused.using); // a lookup indicating each dependency is used by which files
  console.log(unused.invalidFiles); // files that cannot access or parse
  console.log(unused.invalidDirs); // directories that cannot access
})
```

<!-- LICENSE/ -->
# License

Unless stated otherwise all works are:

Copyright &copy; Sebastian Landwehr <info@dword-design.de>

and licensed under:

[MIT License](https://opensource.org/licenses/MIT)
<!-- /LICENSE -->
