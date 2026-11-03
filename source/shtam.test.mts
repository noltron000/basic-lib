
import assert from 'node:assert/strict'
import test from 'node:test'
import * as shtam from './index.mts'

test('exports mathematical constants and rounding helpers', () => {
	assert.equal(shtam.PHI, (1 + Math.sqrt(5)) / 2)
	assert.equal(shtam.PSI, 1 + Math.sqrt(2))
	assert.equal(shtam.PI, Math.PI)
	assert.equal(shtam.E, Math.E)
	assert.equal(shtam.round(2.6), 3)
	assert.equal(shtam.floor(2.6), 2)
	assert.equal(shtam.ceil(2.4), 3)
	assert.equal(shtam.trunc(-2.6), -2)
})

test('formats padded numbers, currency, and angle conversions', () => {
	assert.equal(shtam.padZeroes(42, 2, 2), '0042.00')
	assert.equal(shtam.padZeroes(12.3, 1, 2), '012.300')
	assert.equal(shtam.padZeroes(-42, 2, 0), '-0042')
	assert.equal(shtam.padZeroes(42, 0, 0), '42')
	assert.equal(shtam.formatDollars(12.5), '$ 12.50')
	assert.equal(shtam.formatCents(12.34), '1234 ¢')
	assert.equal(shtam.formatCents(0.29), '29 ¢')
	assert.equal(shtam.radToDeg(Math.PI), 180)
	assert.equal(shtam.degToRad(180), Math.PI)
	assert.throws(() => shtam.padZeroes(42, -1, 2), RangeError)
	assert.throws(() => shtam.padZeroes(Infinity, 2, 2), RangeError)
})

test('calculates taxes, interest, and mortgage payments', () => {
	assert.equal(shtam.taxAmount(100, 0.1), 10)
	assert.ok(Math.abs(shtam.taxTotal(100, 0.1) - 110) < 1e-10)
	assert.ok(Math.abs(shtam.interestCompound(100, 0.1, 2) - 121) < 1e-10)
	assert.ok(Math.abs(shtam.interestSimple(100, 0.1, 2) - 120) < 1e-10)
	assert.ok(Math.abs(shtam.mortgage(100, 0.1, 2) - 60.5) < 1e-10)
	assert.throws(() => shtam.mortgage(100, 0.1, 0), RangeError)
})

test('converts bases and rejects invalid radix input', () => {
	assert.equal(shtam.toBase(255), 'ff')
	assert.equal(shtam.toBase(255, 10, 2), '11111111')
	assert.equal(shtam.toBase(-15, 10, 16), '-f')
	assert.throws(() => shtam.toBase(10, 1, 16), RangeError)
	assert.throws(() => shtam.toBase(2, 2, 10), RangeError)
})

test('generates values in the requested ranges', () => {
	const randomValue = shtam.random(2, 5)
	assert.ok(randomValue >= 2 && randomValue < 5)
	assert.equal(shtam.random(4, 4), 4)
	assert.throws(() => shtam.random(5, 2), RangeError)

	const randomInteger = shtam.randInt(2, 5)
	assert.ok(Number.isInteger(randomInteger))
	assert.ok(randomInteger >= 2 && randomInteger < 5)
	assert.throws(() => shtam.randInt(3.1, 3.9), RangeError)
	assert.match(shtam.randHex(), /^#[0-9A-F]{6}$/)
})

test('calculates factorials and approximates Euler’s number', () => {
	assert.equal(shtam.factorial(0), 1)
	assert.equal(shtam.factorial(1), 1)
	assert.equal(shtam.factorial(5), 120)
	assert.equal(shtam.factorial(171), Infinity)
	assert.ok(Math.abs(shtam.eulersNumber(5) - Math.E) < 0.002)
	assert.equal(shtam.eulersNumber(0), 1)
	assert.ok(Math.abs(shtam.eulersNumber() - Math.E) < 1e-14)
	assert.throws(() => shtam.factorial(-1), RangeError)
	assert.throws(() => shtam.factorial(2.5), RangeError)
	assert.throws(() => shtam.eulersNumber(-1), RangeError)
})
