[![npm version](https://img.shields.io/npm/v/%40noltron000%2Fbasic-lib)](https://www.npmjs.com/package/@noltron000/basic-lib)
[![Coverage Status](https://coveralls.io/repos/github/noltron000/basic-lib/badge.svg?branch=main)](https://coveralls.io/github/noltron000/basic-lib?branch=main)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

# BasicLib
BasicLib is a collection of small TypeScript utilities for math, dates and times, and strings.
Everything is available as named exports from the package root.

The source module names are phrases spelled backwards:
`shtam` is "maths", `setad` is "dates", and `sdrow` is "words".

> Hi there!
> Thanks for visiting my repository here.
> This was made during college, around 2018, as a class project.
> As you can see, the library is pretty exploratory, so I doubt anyone would legitimately make good use of it.
> That said, you are free to browse, copy, and reuse this code as you see fit.

## Install
~~~sh
npm install @noltron000/basic-lib
~~~

The package exports TypeScript source files.
Use a TypeScript-aware toolchain or a Node.js version that supports type stripping.
If your Node.js version requires it, run with `--experimental-strip-types`.

## Use
~~~ts
import { Setad, camelCase, formatDollars, random } from '@noltron000/basic-lib'

console.log(formatDollars(12.5)) // "$ 12.50"
console.log(camelCase('hello, basic library')) // "helloBasicLibrary"
console.log(random(1, 5)) // A number >= 1 and < 5

const date = new Setad(2024, 1, 29)
console.log(date.mask('DNAME, MNAME DAY, YEAR')) // "thursday, february 29, 2024"
~~~

## Modules
- **Math and numbers (`shtam`)**: constants, rounding and conversion helpers, random values, and financial calculations.
- **Dates and times (`setad`)**: date construction, date-part access, formatting, and relative-time descriptions.
- **Strings (`sdrow`)**: word and sentence transforms, whitespace helpers, and common casing styles.

## Develop and test
Requires Node.js 22 and npm.
~~~sh
npm ci
npm test
~~~

Generate a text coverage summary and an LCOV report with `npm run coverage`.
The report is written to `coverage/lcov.info`.

## License
BasicLib is available under the [MIT License](LICENSE.md).
