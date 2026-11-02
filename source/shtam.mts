/*
	CHALLENGE 1:
	define some irrational constants.
*/

// Golden Ratio
export const PHI: number = (1 + 5**(1 / 2)) / 2
// Silver Ratio
export const PSI: number = PHI - 1
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
	let maybeDecimal: string = ''
	if (number % 1 == 0 || right == 0) {
		// If the number is divisible by 1,
		// then it is a whole number.
		// This means it does not have a decimal point.
		maybeDecimal = maybeDecimal.concat('.')
	}
	// Combine the stringified number with the maybeDecimal.
	let middle: string = `${number.toString()}${maybeDecimal}`
	// This string literal takes care of the rest.
	return `${'0'.repeat(left)}${middle}${'0'.repeat(right)}`
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
	amount *= 100
	return amount.toString() + ' ¢'
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
	return parseInt(number.toString(), before).toString(after)
}

/*
	CHALLENGE 11:
	random functionality
*/


export const random = (
	min: number = 0, // min is inclusive
	max: number = 1, // max is exclusive
): number => {
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
	// Clean the input a bit.
	// We want the same weight on each number.
	min = ceil(min)
	max = floor(max)
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
	const hexCode: string = toBase(randomDecimal)
	// Return the reformatted string.
	return `#${hexCode.toUpperCase()}`
}

/*
	STRETCH CHALLENGE A:
	implement factorial.
*/

export const factorial = (n: number): number => {
	let product: number

	if (n === 1 || n === 0) {
		// base case
		product = n
	} else if (n > 1) {
		// larger positive number
		product = n * factorial(n - 1)
	} else {
		// some other wierd case
		product = NaN
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
		} else if (n > 1) {
			// larger positive number
			product = i * productList[i - 1]
		} else {
			// some other wierd case
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
