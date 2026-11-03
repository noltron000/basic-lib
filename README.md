[![npm version](https://img.shields.io/npm/v/%40noltron000%2Fbasic-lib)](https://www.npmjs.com/package/@noltron000/basic-lib)
[![Coverage Status](https://coveralls.io/repos/github/noltron000/basic-lib/badge.svg?branch=main)](https://coveralls.io/github/noltron000/basic-lib?branch=main)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)

# BasicLib
BasicLib is a collection of small TypeScript utilities for math and numbers,
dates and times, and strings. Its APIs are exported from one package entry point.

## Contents
- [BasicLib](#basiclib)
	- [Contents](#contents)
	- [Install](#install)
	- [Use](#use)
	- [API](#api)
		- [Math and numbers (`shtam`)](#math-and-numbers-shtam)
		- [Dates and times (`setad`)](#dates-and-times-setad)
		- [Strings (`sdrow`)](#strings-sdrow)
	- [Develop and test](#develop-and-test)
	- [License](#license)

## Install
```sh
npm install @noltron000/basic-lib
```

The package exports TypeScript `.mts` source files. Use a TypeScript-aware
toolchain, or a Node.js version that supports stripping TypeScript types when
running it directly. On Node.js versions that require the flag, use
`--experimental-strip-types`.

## Use
Import the functions and classes you need from the package:
```ts
import {
	Setad,
	camelCase,
	formatDollars,
	random,
} from '@noltron000/basic-lib'

console.log(formatDollars(12.5)) // "$ 12.50"
console.log(camelCase('hello, basic library')) // "helloBasicLibrary"
console.log(random(1, 5)) // A number >= 1 and < 5

const date = new Setad(2024, 1, 29)
console.log(date.mask('DNAME, MNAME DAY, YEAR')) // "thursday, february 29, 2024"
```

`Setad` uses JavaScript `Date` conventions for numeric date parts: months are
zero-based (`0` is January), and omitted day/time parts default to the first
day and midnight. It also accepts a `Date`, date string, or timestamp.

## API
All names below are named exports from `@noltron000/basic-lib`.

### Math and numbers (`shtam`)
**Constants**
- `PHI`, `PSI`, `PI`, `E` — the golden ratio, silver ratio, π, and Euler's
	number.

**Helpers**
- `round(number)`, `floor(number)`, `ceil(number)`, `trunc(number)` — wrappers
	around the corresponding `Math` operations.
- `padZeroes(number, left, right)` — returns a string with the requested
	zero-padding before the integer part and after the decimal point. Padding
	lengths must be non-negative integers and the value must be finite.
- `radToDeg(radians)`, `degToRad(degrees)` — convert between radians and
	degrees.
- `formatDollars(amount)`, `formatCents(amount)` — format a dollar amount as
	dollars or rounded cents (for example, `formatCents(12.34)` returns
	`"1234 ¢"`).
- `taxAmount(amount, rate)`, `taxTotal(amount, rate)` — calculate the tax
	portion or amount including tax. `rate` is a decimal rate, such as `0.1`
	for 10%.
- `interestCompound(amount, rate, intervals)`,
	`interestSimple(amount, rate, intervals)` — calculate compound or simple
	interest totals using a decimal rate.
- `mortgage(amount, rate, intervals)` — calculate the compounded total divided
	by the number of intervals. `intervals` must be positive and finite.
- `toBase(number, before = 10, after = 16)` — convert an integer from one
	radix to another. Radices must be integers from 2 through 36.
- `random(min = 0, max = 1)` — return a random number in the half-open range
	`[min, max)`. Bounds must be finite, and `max` cannot be less than `min`.
- `randInt(min = 0, max = 10)` — return a random integer in the half-open
	range `[min, max)`. Non-integer bounds are rounded inward; the resulting
	range must contain at least one integer.
- `randHex()` — return a random uppercase six-digit color string such as
	`"#A1B2C3"`.
- `factorial(n)` — calculate `n!`; `n` must be a non-negative integer.
- `eulersNumber(precision = 100)` — approximate Euler's number by summing
	terms through the requested factorial precision.

### Dates and times (`setad`)
`Setad` wraps a JavaScript `Date`. Its constructor accepts no arguments (the
current date and time), a `Date`, a date string, a timestamp, or numeric
`year, month, day?, hours?, minutes?, seconds?, milliseconds?` parts. Invalid
dates throw a `RangeError`.
- `getYear()`, `getMonth()`, `getDay()` — return the local year, zero-based
	month, and day of the month.
- `getHour()`, `getMinute()`, `getSecond()`, `getMillisecond()` — return local
	time parts.
- `readDay()`, `readMonth()` — return the local weekday or month name in
	lowercase.
- `isLeapYear()` — report whether the local year is a Gregorian leap year.
- `mask(pattern)` — replace date/time tokens in a pattern:

	| Token | Meaning | Example |
	| --- | --- | --- |
	| `YEAR` / `year` | Four-digit / two-digit year | `2024` / `24` |
	| `MONTH` / `month` | Zero-padded / unpadded month number | `02` / `2` |
	| `MNAME` / `mname` | Full / three-letter month name | `february` / `feb` |
	| `DAY` / `day` | Zero-padded / unpadded day of month | `09` / `9` |
	| `DNAME` / `dname` | Full / three-letter weekday name | `thursday` / `thu` |
	| `HOUR` / `hour` | Zero-padded / unpadded hour | `03` / `3` |
	| `MINUTE` / `minute` | Zero-padded / unpadded minute | `04` / `4` |
	| `SECOND` / `second` | Zero-padded / unpadded second | `05` / `5` |
	| `MILLI` / `milli` | Zero-padded / unpadded millisecond | `006` / `6` |

- `when(other)` — describe `other` relative to this `Setad`. Equal values
	return `"right now"`; an earlier `other` returns a phrase ending in
	`"ago"`, and a later one ends in `"from now"`.

	```ts
	const reference = new Setad('2024-01-01T00:00:00.000Z')
	reference.when(new Setad('2024-01-01T00:00:02.000Z')) // "2 seconds from now"
	```

### Strings (`sdrow`)
**Word helpers**
- `capWord(word)` — capitalize the first character and lowercase the rest.
- `upperWord(word)`, `lowerWord(word)` — change the entire word's case.
- `jiggleWord(word)`, `wiggleWord(word)` — alternate uppercase/lowercase
	characters, starting uppercase or lowercase respectively.

**Whitespace and character helpers**
- `removeSpaces(sentence)` — remove all whitespace.
- `trimSpaces(sentence)` — collapse whitespace runs to one space and trim the
	ends.
- `removeNonAlpha(sentence)` — remove digits and non-word punctuation while
	retaining whitespace and underscores.
- `caseCase(sentence, transformWord)` — normalize whitespace, apply a
	word-transform function to each word, and join the words with single spaces.

**Sentence transforms**
- `upperCase(sentence)`, `lowerCase(sentence)` — change each word's case.
- `jiggleCase(sentence)`, `wiggleCase(sentence)` — alternate each word's case.
- `kababCase(sentence)`, `kebabCase(sentence)` — lowercase words joined by
	hyphens; `kebabCase` is an alias of `kababCase`.
- `snakeCase(sentence)` — lowercase words joined by underscores.
- `camelCase(sentence)`, `pascalCase(sentence)` — create lower camel-case or
	Pascal-case text.

## Develop and test
Requires Node.js 22 and npm. Clone the repository, install dependencies, and
run the test suite:
```sh
npm ci
npm test
```

Generate a text coverage summary and an LCOV report for Coveralls with:
```sh
npm run coverage
```

The LCOV file is written to `coverage/lcov.info`. GitHub Actions runs tests and
submits this report to Coveralls on pushes and pull requests.

## License
BasicLib is available under the [MIT License](LICENSE.md).
