# FEW 2.1 - Assignment 5 - Math Lib
## Description
The goal of this assignment is to practice everything you learned so far in lessons 1 through 4 and practice those skills making another library!

### Why this assignment?
Doing something once isn't enough.
To claim mastery you need to put your skills to use everyday.
You also need to revisit skills and put them to use in new places.

Math and Numbers in JS can produce unexpected results sometimes.
With this library you will dig into both and see how they work by writing a set of utilities.

## Project requirements
Create a new repo on GitHub to host your code.
The code you write should be a set of functions that solve the problems below:
- All of your code should be unit tested.
- Add continuous Integration.
- Your repo should be connected to Travis CI and code coverage.

The README in your repo should inlcude Badges that show the status and meta information about your repo.
- Version
- Size
- Build Passing
- Coverage

Your README should also include some professional documentation.
This will include a description of the library, and formatted code samples.

### Challenges

- **Challenge 1** GoldenRatio - Add a new **property** to Number that is the [Golden Ratio](https://en.wikipedia.org/wiki/Golden_ratio)
	- Example: `Number.goldenRatio // 1.61803398875`
	- Strategy: `Number.prototype = 1.61803398875`
	- Stretch: Calculate the golden ratio with math
- **Challenge 2** Number Methods: round, floor, ceil - These method already exists, your job is to make a method that does the same thing.
	Rather than `Math.round(x)` your method will work like this: `x.round()`.
	- `round()` - `x = 9.99` - `x.round()` -> 10
	- `floor()` - `x = 9.99` - `x.floor()` -> 9
	- `ceil()` - `x = 1.03` - `x.ceil()` -> 2
- **Challenge 3** `pad(x, y)` - pads Number with `x` 0s before, and `y` 0s after.
	- Example: `34.801.pad(4,4)` -> 0034.8010
- **Challenge 4** `degToRad(n)` - I'm surprised this function is not included with JS.
	- Example: `degToRad(45)` -> `0.785`
	- Strategy: Write a function that takes a number and returns the results of this formula: `deg * (Math.PI / 180)`
	- Stretch Goal: Check for invalid input.
		If the value input is not a number or is not included the function should throw and error.

- **Challenge 5** `radToDeg(deg)` - Covert radians to degrees.
	- Example: `radToDeg(0.785)` -> `44.977`
	- Strategy: Write a function that takes a number and returns calculation from this formula: `radians * (180/pi)`
	- Stretch Goal: Check for invalid input.
		If the value input is not a number or is not included the function should throw and error.

- **Challenge 6** `toDollars(amount)` - Formatting money is a common task for software projects.
	A function could save you time in the future.
	The goal of this function is to take a numeric value and return a string beginning with a '$' and rounded to two decimal places.
	- Example: `toDollars(3.9)` -> `$3.90` (Note: pads with a 0)
	- Strategy: The `Number.toFixed(n)` method will do most of the work for you!
	- Stretch Goals: Create a currency formatting function that simplifies the use of: [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
		- `intFormat(amount, countryCode, style)`
- **Challenge 7** `tax(rate)` - Returns the tax amount
	- Example: `tax(rate)` - returns the amount with tax
- **Challenge 8** `interest(total, year, rate)` - Write a function that calculates the interest over time.
	- Example: https://stackoverflow.com/questions/28325001/how-to-calculate-interest-javascript
- **Challenge 9** `mortage(principal, numberOfPayments, interestRate)`.
	- Example: https://stackoverflow.com/questions/17101442/how-to-calculate-mortgage-in-javascrip
- **Challenge 10** `intToHex(int)` -> #332211
	- Example: https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hexadecimal-in-javascript
- **Challenge 11** Random functions
	- `random(n)` - returns an integer from 0 to n - 1
	- `randomRange(min, max)` - returns an integer between min and max
	- `randomColor()` - Returns a random hex color

### Stretch
- BigInt - Is class that tracks extra large integer values.
	I hear these are great for Incremental games.
	BigInt holds a large number as a string.
	It provides methods that perform math operation.
	- `new BigInt(value = 0)` - Initialize with a value or 0.
	- `BigInt.add(x)` - adds x to the value.
		Since value is a String you need add the first digit to the first digit held in value and carry the one if the total is over 10.
		Do the same with the 10s and 100s etc.
		This is just like adding numbers with pencil and paper.
		- Q: Is this legit? A: Yes! There are a couple libraries that do this.
			Computers have a limit to how large a number they can handle.
			In most cases this is enough.
			For some uses you need larger numbers.
	- `BigInt.subtract(x)` - Subtracts x from the value of BigInt.
		- Advanced
			- `BigInt.multiply(x)` - Multiplies the BigInt value by x.
			- `BigInt.divide(x)` - Divides the BigInt value by x.

# FEW 2.1 - Assignment 7 - Date Lib
## Description
Dates are super important. You'll use them often. The goal of this assignment is to become more familiar with the Date object it's methods and how to work with Dates.

## Why Do this assignment?
You'll make use the JS Date Object often. Building a library around dates will give you a better understanding of it works and what you can do with it.

## Project requirements
Your job is to make a class that wraps the Date object. Your class should have a Date it keeps internally. It should be able to instantiate itself with the same parameters that are used with the Date Object.

**Challenge 1**

The Date Object can be instantiated with a date string, or with a list of parameter for: year, month, date, hours, mins, secs.

```JS
class D {
	constructor(...args) {
		this.date = new Date(...args)
	}
}
```

Read about `...args`: https://javascript.info/rest-parameters-spread-operator

tl;dr args is an array with all of the parameters passed to the function/constructor. The `...` (spread operator) deconstructs the array. This allows for a variable number of arguments to be passed.

You should be able to instantiate this class like this now:

```JS
const d = new D('9/26/1965') // Create a date from a string
const e = new D(1970, 1, 1, 0, 0, 0)
```

**Challenge 2**

Your class should provide human readable values for year, month, date, hour, mins, secs.

```JS
// Gets the current date with no params
const d = new D()
console.log(d.year())  // 2019 fullYear
console.log(d.month()) // July 6
console.log(d.day())   // 27
console.log(d.hours()) // 18
console.log(d.mins()) // 6
console.log(d.secs()) // 5
```

**Challenge 3**

You need a format method that takes a "mask" string. The mask will contain formatting characters which displays various date elements, other characters are displayed unchanged.

List of formatting characters:

- 'Y' -> 2019
- 'y' -> 19
- 'M' -> July
- 'm' -> Jul
- 'D' -> 01
- 'd' -> 1
- 'H' -> 05
- 'h' -> 5
- 'I' -> 08
- 'i' -> 8
- 'S' -> 04
- 's' -> 4

The `format()` method should provide an acceptable default formatted date with no parameters.

For example:

```JS
// Make a date with values for Y, M, D etc.
const d = new D(2017, 0, 2, 3, 4, 5)
console.log(d.format()) // 2017 January 02
console.log(d.format('y/m/d')) // 17/Jan/2
console.log(d.format('H:I:S')) // 03:04:05
console.log(d.format('h:i:s')) // 3:4:5
console.log(d.format('Y-M-D h:I:S')) // 2017-January-02 3:04:05
```

**Challenge 4**

Make a `when()` this should return a human readble description of 'when' a date will occur.

This method should compare the date owned by your class instance with the current date.

```JS
const d = new D(2019, 0, 2, 3, 4, 5)
console.log(d.when()) // 6 months ago
const d = new D(2019, 9, 2, 3, 4, 5)
console.log(d.when()) // 3 months from now
const d = new D(2024, 9, 2, 3, 4, 5)
console.log(d.when()) // 5 years from now
const d = new D(2019, 6, 30, 3, 4, 5)
console.log(d.when()) // 3 days from now
```

**Stretch Challenge**

Look for edge cases in the `when()` method. When does it not work?

- Decribe the edge case the problem and what casues it
- Solve the problem in code

**Stretch Challenge**

Make `when()` work for time hours minutes, seconds.

- 1 hour from now
- 3 hours ago
- 23 mins from now
- 11 mins ago
- 23 seconds from now
- 52 seconds ago

**Stretch Challenge**

Take the challenge above one step further by including both date and time. This is an open ended challenge you can make it as detailed as you care to take it. Feel free to interprept the challenge and make your best judgement as to how it can be implemented.

Here is some sample output:

- 2 days three hours from now
- 3 years 5 months 2 days from now
- 1 year 4 months 23 days ago
- 3 hours and 24 minutes from now
- etc.

**Challenge 5**

Document your date lib. Do this by writing JS Doc string comments describing each method.

Output the documentation to your repo or write it to your readme.md file.

Use: https://documentation.js.org

**Challenge 6**

Publish your date lib to npm. Include the following badges in your readme.md:

- npm version
- license
- size
- GitHub Issues

**Challenge 7**

Add continuous integration. Use Travis-ci and Coveralls.

Add badges for:

- Build
- Coverage

**Challenge 8**

Use Rollup to bundle your date lib. Include both umd and esm bundles.

**Stretch Challenge**

Use `.toPrimitive()` to allow your Data object to return a String or Number depending on context.

https://javascript.info/object-toprimitive

### Deliverable
After completing the challenges above post a link to your npm package on npm.
