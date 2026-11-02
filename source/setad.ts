class Setad {
	date: Date
	constructor(...args: any[]) {
		// @ts-ignore
		this.date = new Date(...args)
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
		return this.date.getFullYear() % 4 == 0
	}

	mask = (mask: string): string => {
		const fullYear = this.getYear().toString()
		const truncYear = clipString(fullYear, 2, true)
		mask = mask.replace('YEAR', fullYear)
		mask = mask.replace('year', truncYear)

		const bareMonth = this.getMonth().toString()
		const paddedMonth = leftPad(bareMonth, 2)
		mask = mask.replace('MONTH', paddedMonth)
		mask = mask.replace('month', bareMonth)

		const fullMonthName = this.readMonth()
		const truncMonthName = clipString(fullMonthName, 3)
		mask = mask.replace('MNAME', fullMonthName)
		mask = mask.replace('mname', truncMonthName)

		const bareDay = this.getDay().toString()
		const paddedDay = leftPad(bareDay, 2)
		mask = mask.replace('DAY', paddedDay)
		mask = mask.replace('day', bareDay)

		const fullDayName = this.readDay()
		const truncDayName = clipString(fullDayName, 3)
		mask = mask.replace('DNAME', fullDayName)
		mask = mask.replace('dname', truncDayName)

		const bareHour = this.getHour().toString()
		const paddedHour = leftPad(bareHour, 2)
		mask = mask.replace('HOUR', paddedHour)
		mask = mask.replace('hour', bareHour)

		const bareMinute = this.getMinute().toString()
		const paddedMinute = leftPad(bareMinute, 2)
		mask = mask.replace('MINUTE', paddedMinute)
		mask = mask.replace('minute', bareMinute)

		const bareSecond = this.getSecond().toString()
		const paddedSecond = leftPad(bareSecond, 2)
		mask = mask.replace('SECOND', paddedSecond)
		mask = mask.replace('second', bareSecond)

		const bareMillisecond = this.getMillisecond().toString()
		const paddedMillisecond = leftPad(bareMillisecond, 3)
		mask = mask.replace('MILLI', paddedMillisecond)
		mask = mask.replace('milli', bareMillisecond)

		return mask
	}

	when = (that: Setad): string => {
		let diff: number
		diff = this.date.valueOf() - that.date.valueOf()

		// get addon english stuff for output
		let endOfPhrase: string
		if (diff < 0) {
			endOfPhrase = 'from now'
		} else {
			endOfPhrase = 'ago'
		}
		// take absolute value of difference;
		// its not human readable if negative.
		diff = Math.abs(diff)
		const milliseconds: number = diff % 1000
		diff = Math.floor(diff / 1000)
		const seconds: number = diff % 60
		diff = Math.floor(diff / 60)
		const minutes: number = diff % 60
		diff = Math.floor(diff / 60)
		const hours: number = diff % 24
		diff = Math.floor(diff / 24)
		const days: number = diff % 365
		diff = Math.floor(diff / 365)
		const years: number = diff

		let baseOfPhrase: string = ''
		let finalPhrase: string = ''
		if (diff > 0) {
			// go backwards from largest to smallest
			if (years > 0) {
				baseOfPhrase += `${years} years, `
			}
			if (days > 0) {
				baseOfPhrase += `${days} days, `
			}
			if (hours > 0) {
				baseOfPhrase += `${hours} hours, `
			}
			if (minutes > 0) {
				baseOfPhrase += `${minutes} minutes, `
			}
			if (seconds > 0) {
				baseOfPhrase += `${seconds} seconds, `
			}
			if (milliseconds > 0) {
				baseOfPhrase += `${milliseconds} milliseconds, `
			}
			// trim final comma-space combo
			baseOfPhrase = baseOfPhrase.slice(0, -2)
			// complete the phrase
			finalPhrase = `${baseOfPhrase} ${endOfPhrase}`
		} else {
			finalPhrase = 'right now'
		}

		return finalPhrase
	}
}

// LeftPad expects an integer, and outputs a string.
const leftPad = (inputNum: string, digits: number): string => {
	// `output` is the string to give back; it starts empty.
	let output: string = ''
	// `size` is the number of digits that the number has.
	const size: number = inputNum.length
	if (digits > size) {
		const diff: number = digits - size
		output = '0'.repeat(diff)
	}
	return `${output}${inputNum}`
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
