import assert from 'node:assert/strict'
import test from 'node:test'
import * as sdrow from './sdrow.ts'

// *BELOW ARE ALL WORD-BASED FUNCTIONS* //

test('capWord(): capitalizes a word', () => {
	assert.equal(sdrow.capWord('capitalize'), 'Capitalize')
	assert.equal(sdrow.capWord('hELLO'), 'Hello')
	assert.equal(sdrow.capWord(''), '')
})

test('upperWord(): capitalizes an entire word', () => {
	assert.equal(sdrow.upperWord('uppercase'), 'UPPERCASE')
})

test('lowerWord(): decapitalizes an entire word', () => {
	assert.equal(sdrow.lowerWord('LOWERCASE'), 'lowercase')
})

test('jiggleWord(): alternates upper and lower case', () => {
	assert.equal(sdrow.jiggleWord('jiggLY'), 'JiGgLy')
	assert.equal(sdrow.jiggleWord(''), '')
})

test('wiggleWord(): alternates lower and upper case', () => {
	assert.equal(sdrow.wiggleWord('WIggly'), 'wIgGlY')
})

// *THESE TWO ARE SPACE-ORIENTED HELPER FUNCTIONS* //

test('removeSpaces(): removes all whitespace', () => {
	assert.equal(sdrow.removeSpaces('   this string  is full of space'), 'thisstringisfullofspace')
	assert.equal(sdrow.removeSpaces('two\twords\nhere'), 'twowordshere')
})

test('trimSpaces(): reduces whitespace to single spaces', () => {
	assert.equal(sdrow.trimSpaces('   this string  is full of space'), 'this string is full of space')
	assert.equal(sdrow.trimSpaces('  two\t words\nhere  '), 'two words here')
})

test('removeNonAlpha(): removes punctuation and digits', () => {
	assert.equal(sdrow.removeNonAlpha('word 101! _test'), 'word  _test')
})

// *BELOW ARE ALL SENTENCE-BASED FUNCTIONS* //

test('caseCase(): applies a transform to each word', () => {
	assert.equal(sdrow.caseCase('  two\t words  ', sdrow.capWord), 'Two Words')
})

test('upperCase(): capitalizes all letters', () => {
	assert.equal(sdrow.upperCase('I am a MOSTLY lowercase sentence.'), 'I AM A MOSTLY LOWERCASE SENTENCE.')
})

test('lowerCase(): decapitalizes all letters', () => {
	assert.equal(sdrow.lowerCase('I am a MOSTLY lowercase sentence.'), 'i am a mostly lowercase sentence.')
})

test('jiggleCase(): alternates case starting with uppercase', () => {
	assert.equal(sdrow.jiggleCase('I am a MOSTLY lowercase sentence.'), 'I Am A MoStLy LoWeRcAsE SeNtEnCe.')
})

test('wiggleCase(): alternates case starting with lowercase', () => {
	assert.equal(sdrow.wiggleCase('I am a MOSTLY lowercase sentence.'), 'i aM a mOsTlY lOwErCaSe sEnTeNcE.')
})

test('kababCase() and kebabCase(): return hyphen-separated lowercase words', () => {
	const sentence = 'I am a MOSTLY lowercase sentence.'
	assert.equal(sdrow.kababCase(sentence), 'i-am-a-mostly-lowercase-sentence')
	assert.equal(sdrow.kebabCase(sentence), sdrow.kababCase(sentence))
	assert.equal(sdrow.kababCase('  hello,   world!  '), 'hello-world')
})

test('snakeCase(): returns underscore-separated lowercase words', () => {
	assert.equal(sdrow.snakeCase('I am a MOSTLY lowercase sentence.'), 'i_am_a_mostly_lowercase_sentence')
})

test('camelCase(): returns a lower camel-case phrase', () => {
	assert.equal(sdrow.camelCase('I am a MOSTLY lowercase sentence.'), 'iAmAMostlyLowercaseSentence')
})

test('pascalCase(): returns a Pascal-case phrase', () => {
	assert.equal(sdrow.pascalCase('I am a MOSTLY lowercase sentence.'), 'IAmAMostlyLowercaseSentence')
})
