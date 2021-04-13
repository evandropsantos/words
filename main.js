const path = require('path')
const fn = require('./functions')

const files = path.join(__dirname, 'subtitle')
const symbols = ['.', '?', '-', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')']

const joinList = (list) => list.join(' ')
const splitLines = (line) => line.split('\n')
const splitWords = (word) => word.split(' ')

fn.readFolder(files)
  .then(fn.filterText('.srt'))
  .then(fn.readFiles)
  .then(joinList)
  .then(splitLines)
  .then(fn.removeClean)
  .then(fn.removeTexts('-->'))
  .then(fn.removeNumbers)
  .then(fn.removeSymbols(symbols))
  .then(joinList)
  .then(splitWords)
  .then(fn.removeClean)
  .then(console.log)
