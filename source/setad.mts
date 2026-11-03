export class Setad {
	date: Date
	constructor()
	constructor(value: Date | string | number)
	constructor(
		year: number,
		month: number,
		day?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		milliseconds?: number,
	)
	constructor(
		value?: Date | string | number,
		month?: number,
		day = 1,
		hours = 0,
		minutes = 0,
		seconds = 0,
		milliseconds = 0,
	) {
		if (value instanceof Date) {
			this.date = new Date(value.getTime())
		} else if (typeof value === 'number' && month !== undefined) {
			this.date = new Date(
				value,
				month,
				day,
				hours,
				minutes,
				seconds,
				milliseconds,
			)
		} else if (typeof value === 'string' || typeof value === 'number') {
			this.date = new Date(value)
		} else {
			this.date = new Date()
		}

		if (Number.isNaN(this.date.getTime())) {
			throw new RangeError('Setad requires a valid date.')
		}
	}

	getYear = (): number => {
		return this.date.getFullYear()
	}

	getMonth = (): number => {
		return this.date.getMonth()
	}

	getDay = (): number => {
		return this.date.getDate()
	}

	getHour = (): number => {
		return this.date.getHours()
	}

	getMinute = (): number => {
		return this.date.getMinutes()
	}

	getSecond = (): number => {
		return this.date.getSeconds()
	}

	getMillisecond = (): number => {
		return this.date.getMilliseconds()
	}

	readDay = (): string => {
		const days: string[] = [
			'sunday',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
		]
		return days[this.date.getDay()]
	}

	readMonth = (): string => {
		const months: string[] = [
			'january',
			'february',
			'march',
			'april',
			'may',
			'june',
			'july',
			'august',
			'september',
			'october',
			'november',
			'december',
		]
		return months[this.date.getMonth()]
	}

	isLeapYear = (): boolean => {
		const year = this.getYear()
		return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
	}

	mask = (mask: string): string => {
		const fullYear = this.getYear().toString()
		const truncYear = clipString(fullYear, 2, true)
		mask = mask.replace(/YEAR/g, fullYear)
		mask = mask.replace(/year/g, truncYear)

		const bareMonth = (this.getMonth() + 1).toString()
		const paddedMonth = leftPad(bareMonth, 2)
		mask = mask.replace(/MONTH/g, paddedMonth)
		mask = mask.replace(/month/g, bareMonth)

		const fullMonthName = this.readMonth()
		const truncMonthName = clipString(fullMonthName, 3)
		mask = mask.replace(/MNAME/g, fullMonthName)
		mask = mask.replace(/mname/g, truncMonthName)

		const bareDay = this.getDay().toString()
		const paddedDay = leftPad(bareDay, 2)
		mask = mask.replace(/DAY/g, paddedDay)
		mask = mask.replace(/day/g, bareDay)

		const fullDayName = this.readDay()
		const truncDayName = clipString(fullDayName, 3)
		mask = mask.replace(/DNAME/g, fullDayName)
		mask = mask.replace(/dname/g, truncDayName)

		const bareHour = this.getHour().toString()
		const paddedHour = leftPad(bareHour, 2)
		mask = mask.replace(/HOUR/g, paddedHour)
		mask = mask.replace(/hour/g, bareHour)

		const bareMinute = this.getMinute().toString()
		const paddedMinute = leftPad(bareMinute, 2)
		mask = mask.replace(/MINUTE/g, paddedMinute)
		mask = mask.replace(/minute/g, bareMinute)

		const bareSecond = this.getSecond().toString()
		const paddedSecond = leftPad(bareSecond, 2)
		mask = mask.replace(/SECOND/g, paddedSecond)
		mask = mask.replace(/second/g, bareSecond)

		const bareMillisecond = this.getMillisecond().toString()
		const paddedMillisecond = leftPad(bareMillisecond, 3)
		mask = mask.replace(/MILLI/g, paddedMillisecond)
		mask = mask.replace(/milli/g, bareMillisecond)

		return mask
	}

	when = (that: Setad): string => {
		if (!(that instanceof Setad)) {
			throw new TypeError('Setad.when expects another Setad instance.')
		}

		let diff = this.date.valueOf() - that.date.valueOf()
		if (diff === 0) {
			return 'right now'
		}

		// Choose the phrase direction before taking the absolute difference.
		const endOfPhrase = diff < 0 ? 'from now' : 'ago'
		// Take the absolute value; a negative duration is not human-readable.
		diff = Math.abs(diff)
		// Split the duration into calendar-sized units from smallest to largest.
		const milliseconds = diff % 1000
		diff = Math.floor(diff / 1000)
		const seconds = diff % 60
		diff = Math.floor(diff / 60)
		const minutes = diff % 60
		diff = Math.floor(diff / 60)
		const hours = diff % 24
		diff = Math.floor(diff / 24)
		const days = diff % 365
		const years = Math.floor(diff / 365)

		// Build the description from the largest non-zero unit to the smallest.
		const baseOfPhrase: string[] = []
		if (years > 0) {
			baseOfPhrase.push(formatUnit(years, 'year'))
		}
		if (days > 0) {
			baseOfPhrase.push(formatUnit(days, 'day'))
		}
		if (hours > 0) {
			baseOfPhrase.push(formatUnit(hours, 'hour'))
		}
		if (minutes > 0) {
			baseOfPhrase.push(formatUnit(minutes, 'minute'))
		}
		if (seconds > 0) {
			baseOfPhrase.push(formatUnit(seconds, 'second'))
		}
		if (milliseconds > 0) {
			baseOfPhrase.push(formatUnit(milliseconds, 'millisecond'))
		}

		return `${baseOfPhrase.join(', ')} ${endOfPhrase}`
	}
}

const formatUnit = (count: number, unit: string): string => {
	return `${count} ${unit}${count === 1 ? '' : 's'}`
}

// LeftPad expects an integer, and outputs a string.
const leftPad = (inputNum: string, digits: number): string => {
	return inputNum.padStart(digits, '0')
}

// ClipString is useful for masking phrases.
const clipString = (
	phrase: string,
	length: number,
	right: boolean = false
): string => {
	if (!right) {
		return phrase.slice(0, length)
	} else {
		return phrase.slice(-length)
	}
}
