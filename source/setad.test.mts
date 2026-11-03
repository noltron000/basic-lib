import assert from 'node:assert/strict'
import test from 'node:test'
import { Setad } from './index.mts'

test('constructs dates from supported inputs and copies Date values', () => {
	const source = new Date(2024, 1, 29, 13, 5, 6, 7)
	const date = new Setad(source)
	source.setFullYear(2025)

	assert.equal(date.getYear(), 2024)
	assert.equal(date.getMonth(), 1)
	assert.throws(() => new Setad('not a date'), RangeError)
})

test('reads date and time components', () => {
	const date = new Setad(2024, 1, 29, 13, 5, 6, 7)

	assert.equal(date.getYear(), 2024)
	assert.equal(date.getMonth(), 1)
	assert.equal(date.getDay(), 29)
	assert.equal(date.getHour(), 13)
	assert.equal(date.getMinute(), 5)
	assert.equal(date.getSecond(), 6)
	assert.equal(date.getMillisecond(), 7)
	assert.equal(date.readDay(), 'thursday')
	assert.equal(date.readMonth(), 'february')
})

test('detects leap years using the Gregorian calendar', () => {
	assert.equal(new Setad(2000, 0, 1).isLeapYear(), true)
	assert.equal(new Setad(2024, 0, 1).isLeapYear(), true)
	assert.equal(new Setad(1900, 0, 1).isLeapYear(), false)
	assert.equal(new Setad(2023, 0, 1).isLeapYear(), false)
})

test('formats every supported mask token and replaces repeated tokens', () => {
	const date = new Setad(2024, 0, 2, 3, 4, 5, 6)
	const mask = 'YEAR year MONTH month MNAME mname DAY day DNAME dname HOUR hour MINUTE minute SECOND second MILLI milli YEAR'

	assert.equal(
		date.mask(mask),
		'2024 24 01 1 january jan 02 2 tuesday tue 03 3 04 4 05 5 006 6 2024',
	)
})

test('describes relative times in the past, future, and present', () => {
	const origin = new Setad('2024-01-01T00:00:00.000Z')

	assert.equal(
		new Setad('2024-01-01T00:00:02.003Z').when(origin),
		'2 seconds, 3 milliseconds ago',
	)
	assert.equal(
		new Setad('2023-12-31T23:59:59.000Z').when(origin),
		'1 second from now',
	)
	assert.equal(origin.when(origin), 'right now')
	assert.equal(
		new Setad('2024-01-02T00:00:00.000Z').when(origin),
		'1 day ago',
	)
	assert.equal(
		new Setad('2025-01-01T01:01:01.001Z').when(origin),
		'1 year, 1 day, 1 hour, 1 minute, 1 second, 1 millisecond ago',
	)
})

test('requires another Setad instance when describing a relative time', () => {
	const date = new Setad(0)
	assert.throws(() => Reflect.apply(date.when, date, [{}]), TypeError)
})
