/*
	CHALLENGE 1:
	define some irrational constants.
*/

// Golden Ratio
export const PHI: number = (1 + 5**(1 / 2)) / 2
// Silver Ratio
export const PSI: number = 1 + Math.sqrt(2)
// Perimetros Number
export const PI: number = Math.PI
// Euler's Number
export const E: number = Math.E

/*
	CHALLENGE 2:
	make aliases to referenced math functions.
*/

export const round = (number: number): number => {
	return Math.round(number)
}

export const floor = (number: number): number => {
	return Math.floor(number)
}

export const ceil = (number: number): number => {
	return Math.ceil(number)
}

export const trunc = (number: number): number => {
	return Math.trunc(number)
}

/*
	CHALLENGE 3:
	pads a number with zeroes on the left and right.
	decimals vs whole numbers makes this a bit trickier.
*/

export const padZeroes = (
	number: number,
	left: number,
	right: number,
): string => {
	if (!Number.isInteger(left) || left < 0 ||
		!Number.isInteger(right) || right < 0) {
		throw new RangeError('Padding lengths must be non-negative integers.')
	}
	if (!Number.isFinite(number)) {
		throw new RangeError('The value to pad must be finite.')
	}

	// Keep the sign attached to the value while padding the integer portion.
	const [integer, fraction] = number.toString().split('.')
	const sign = integer.startsWith('-') ? '-' : ''
	const unsignedInteger = sign ? integer.slice(1) : integer
	const paddedInteger = `${sign}${'0'.repeat(left)}${unsignedInteger}`
	if (fraction === undefined && right === 0) {
		return paddedInteger
	}
	// Preserve existing decimal digits and append the requested zeroes.
	return `${paddedInteger}.${fraction ?? ''}${'0'.repeat(right)}`
}

/*
	CHALLENGE 4 & 5:
	define some useful angle functions.
*/

export const radToDeg = (radians: number): number => {
	return radians * 180 / PI
}

export const degToRad = (degrees: number): number => {
	return degrees * PI / 180
}

/*
	CHALLENGE 6:
	cash money
*/

export const formatDollars = (amount: number): string => {
	// assumes amount is in dollars
	return '$ ' + amount.toFixed(2)
}

export const formatCents = (amount: number): string => {
	// assumes amount is in dollars
	return `${Math.round(amount * 100)} ¢`
}

/*
	CHALLENGE 7:
	taxes
*/

export const taxAmount = (
	amount: number,
	rate: number,
): number => {
	return amount * rate
}

export const taxTotal = (
	amount: number,
	rate: number,
): number => {
	return amount * (rate + 1)
}

/*
	CHALLENGES 8 & 9:
	interest rates
*/

export const interestCompound = (
	amount: number,
	rate: number,
	intervals: number,
): number => {
	return amount * (rate + 1) ** intervals
}

export const interestSimple = (
	amount: number,
	rate: number,
	intervals: number,
): number => {
	return amount * (rate * intervals + 1)
}

export const mortgage = (
	amount: number,
	rate: number,
	intervals: number,
): number => {
	if (!Number.isFinite(intervals) || intervals <= 0) {
		throw new RangeError('Mortgage intervals must be a positive finite number.')
	}
	return interestCompound(amount, rate, intervals) / intervals
}

/*
	CHALLENGE 10:
	base N
*/

export const toBase = (
	number: number,
	before: number = 10,
	after: number = 16,
): string => {
	if (![before, after].every(
		(radix) => Number.isInteger(radix) && radix >= 2 && radix <= 36,
	)) {
		throw new RangeError('Radices must be integers between 2 and 36.')
	}
	if (!Number.isInteger(number)) {
		throw new RangeError('The value to convert must be an integer.')
	}
	const input = number.toString()
	const converted = parseInt(input, before)
	if (Number.isNaN(converted)) {
		throw new RangeError(`The value is not valid in base ${before}.`)
	}
	return converted.toString(after)
}

/*
	CHALLENGE 11:
	random functionality
*/


export const random = (
	min: number = 0, // min is inclusive
	max: number = 1, // max is exclusive
): number => {
	if (!Number.isFinite(min) || !Number.isFinite(max) || max < min) {
		throw new RangeError('Random bounds must be finite and max must not be less than min.')
	}
	let randomNumber = Math.random()
	// The random number starts between 0 and 1.
	randomNumber *= (max - min)
	// Rescale it based on the possibility range.
	randomNumber += min
	return randomNumber
}

export const randInt = (
	min: number = 0, // min is inclusive
	max: number = 10, // max is exclusive
): number => {
	if (!Number.isFinite(min) || !Number.isFinite(max)) {
		throw new RangeError('Random integer bounds must be finite.')
	}
	// Clean the input a bit.
	// We want the same weight on each number.
	min = ceil(min)
	max = floor(max)
	if (max <= min) {
		throw new RangeError('Random integer bounds must contain at least one integer.')
	}
	// Grab the random number from the random function.
	let randomNumber: number = random(min, max)
	// Then just take its floor since the max is exclusive.
	return floor(randomNumber)
}

export const randHex = (): string => {
	// `#FFFFFF` is the largest color hex for HTML etc.
	// Each `F` represents the number 16.
	// There are `6` digits in this color code.
	// Retrieve this full hex number in base-10 format.
	const largestDecimal: number = 16**6
	// Now get a random number between zero and this decimal.
	const randomDecimal: number = randInt(0, largestDecimal)
	// Convert the random number to base-16.
	const hexCode: string = toBase(randomDecimal).padStart(6, '0')
	// Return the reformatted string.
	return `#${hexCode.toUpperCase()}`
}

/*
	STRETCH CHALLENGE A:
	implement factorial.
*/

export const factorial = (n: number): number => {
	if (!Number.isInteger(n) || n < 0) {
		throw new RangeError('Factorial requires a non-negative integer.')
	}
	let product: number
	if (n === 0 || n === 1) {
		// base case
		product = 1
	} else {
		// larger positive number
		product = n * factorial(n - 1)
	}

	// finally, return result
	return product
}

const factorialMemo = (n: number): number[] => {
	let productList: number[] = []

	const memo = (i: number): number => {
		let product: number

		if (i === 0 || i === 1) {
			// base case
			product = 1
		} else if (i > 1) {
			// larger positive number
			product = i * productList[i - 1]
		} else {
			// some other weird case
			product = NaN
		}

		// finally, return result
		return product
	}

	// get a range of numbers from 0 to n+1
	const range: number[] = Array.from(Array(n + 1).keys())

	// find factorial for each item
	range.forEach((i: number) => {
		const product: number = memo(i)
		productList.push(product)
	})

	// finally, return resulting list
	return productList
}

/*
	STRETCH CHALLENGE B:
	implement euler's number w/precision.
*/

export const eulersNumber = (precision: number = 100): number => {
	if (!Number.isInteger(precision) || precision < 0) {
		throw new RangeError('Precision must be a non-negative integer.')
	}
	let e: number = 0
	// need every factorial from 0 to n
	const factorialList: number[] = factorialMemo(precision)
	// loop through each factorial and add 1/n! to e
	factorialList.forEach((n: number) => {
		e += 1 / n
	})
	return e
}

/*
	OLD CONTENTS
*/

// intFormat(amount, countryCode, style)
// Number.prototype.toIntlCurrency = function(
// 	locales: string,
// 	currencyType: string,
// ): string {
// 	return new Intl.NumberFormat(locales, {
// 		style: 'currency',
// 		currency: currencyType,
// 	}).format(this)
// }
