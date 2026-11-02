export const capWord = (word: string): string => {
	return word.charAt(0).toUpperCase()
	+ word.slice(1).toLowerCase()
}

export const upperWord = (word: string): string => {
	return word.toUpperCase()
}

export const lowerWord = (word: string): string => {
	return word.toLowerCase()
}

export const jiggleWord = (word: string): string => {
	let result: string = ''
	Array.from(word).forEach((letter, index) => {
		if (index % 2 === 0) {
			letter = letter.toUpperCase()
		} else {
			letter = letter.toLowerCase()
		}
		result += letter
	})
	return result
}

export const wiggleWord = (word: string): string => {
	let result: string = ''
	Array.from(word).forEach((letter, index) => {
		if (index % 2 === 1) {
			letter = letter.toUpperCase()
		} else {
			letter = letter.toLowerCase()
		}
		result += letter
	})
	return result
}

export const removeSpaces = (sentence: string): string => {
	// replace any number of spaces with an empty string.
	// `/\s+` selects consecutive occurences of whitespace.
	// `/g` stands for a global search.
	return sentence.replace(/\s+/g, '')
}

export const trimSpaces = (sentence: string): string => {
	// replace any number of spaces with a single space.
	// then, trim extra spaces before/after the sentence.
	// `/\s+` selects consecutive occurences of whitespace.
	// `/g` stands for a global search.
	return sentence.replace(/\s+/g, ' ').trim()
}

export const removeNonAlpha = (sentence: string): string => {
	// delete non-alpha characters, keeping spaces
	// `[]` states characters can match these.
	// `^` is the not-operator.
	// `|` is the or-operator.
	// `\w` selects alpha characters.
	// `\s` selects space characters.
	// `\d` selects digit characters.
	// `/g` stands for a global search.
	return sentence.replace(/[^\w\s]|\d/g, '')
}

// ==TODO==
// determine what `type` that a function is;
// it is passed in as a parameter!
export const caseCase = (sentence: string, lambda: any): string => {
	let result: string = ''
	const words: string[] = sentence.split(' ')
	for (let word of words) {
		word = lambda(word)
		result = result.concat(word, ' ')
	}
	return result.trim()
}

const capCase = (sentence: string): string => {
	return caseCase(sentence, capWord)
}

export const upperCase = (sentence: string): string => {
	return caseCase(sentence, upperWord)
}

export const lowerCase = (sentence: string): string => {
	return caseCase(sentence, lowerWord)
}

export const jiggleCase = (sentence: string): string => {
	return caseCase(sentence, jiggleWord)
}

export const wiggleCase = (sentence: string): string => {
	return caseCase(sentence, wiggleWord)
}

export const kababCase = (sentence: string): string => {
	let result: string = sentence
	result = lowerCase(result)
	result = trimSpaces(result)
	result = removeNonAlpha(result)
	result = result.replace(/\s/g, '-')
	// replace all spaces with hyphens.
	// `/\s` selects one whitespace character unit.
	// `/g` stands for a global search.
	return result
}

export const snakeCase = (sentence: string): string => {
	let result: string = sentence
	result = lowerCase(result)
	result = trimSpaces(result)
	result = removeNonAlpha(result)
	result = result.replace(/\s/g, '_')
	// replace all spaces with underscores.
	// `/\s` selects one whitespace character unit.
	// `/g` stands for a global search.
	return result
}

export const camelCase = (sentence: string): string => {
	let result: string = sentence
	result = capCase(result)
	result = removeSpaces(result)
	result = removeNonAlpha(result)
	result = result.charAt(0).toLowerCase()
	+ result.slice(1)
	return result
}

export const pascalCase = (sentence: string): string => {
	let result: string = sentence
	result = capCase(result)
	result = removeSpaces(result)
	result = removeNonAlpha(result)
	return result
}
