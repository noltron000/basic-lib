
import assert from 'node:assert/strict'
import test from 'node:test'
import * as shtam from './shtam.mts'

test('exports mathematical constants and rounding helpers', () => {
	assert.equal(shtam.PHI, (1 + Math.sqrt(5)) / 2)
	assert.equal(shtam.PSI, shtam.PHI - 1)
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
	assert.equal(shtam.formatDollars(12.5), '$ 12.50')
	assert.equal(shtam.formatCents(12.34), '1234 ¢')
	assert.equal(shtam.radToDeg(Math.PI), 180)
	assert.equal(shtam.degToRad(180), Math.PI)
})

test('calculates taxes, interest, and mortgage payments', () => {
	assert.equal(shtam.taxAmount(100, 0.1), 10)
	assert.ok(Math.abs(shtam.taxTotal(100, 0.1) - 110) < 1e-10)
	assert.ok(Math.abs(shtam.interestCompound(100, 0.1, 2) - 121) < 1e-10)
	assert.ok(Math.abs(shtam.interestSimple(100, 0.1, 2) - 120) < 1e-10)
	assert.ok(Math.abs(shtam.mortgage(100, 0.1, 2) - 60.5) < 1e-10)
})

test('converts bases and generates values in the requested ranges', () => {
	assert.equal(shtam.toBase(255), 'ff')
	assert.equal(shtam.toBase(255, 10, 2), '11111111')

	const randomValue = shtam.random(2, 5)
	assert.ok(randomValue >= 2 && randomValue < 5)

	const randomInteger = shtam.randInt(2, 5)
	assert.ok(Number.isInteger(randomInteger))
	assert.ok(randomInteger >= 2 && randomInteger < 5)
	assert.match(shtam.randHex(), /^#[0-9A-F]+$/)
})

test('calculates factorials and approximates Euler’s number', () => {
	assert.equal(shtam.factorial(1), 1)
	assert.equal(shtam.factorial(5), 120)
	assert.ok(Math.abs(shtam.eulersNumber(5) - Math.E) < 0.002)
})
