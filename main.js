const path = require('path')
const fn = require('./functions')

const files = path.join(__dirname, 'subtitle')
const symbols = [
  '.', '?', '-', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')'
]


fn.readFolder(files)
  .then(fn.filterText('.srt'))
  .then(fn.readFiles)
  .then((list) => list.join('\n'))
  .then((text) => text.split('\n'))
  .then(fn.removeClean)
  .then(fn.removeTexts('-->'))
  .then(fn.removeNumbers)
  .then(fn.removeSymbols(symbols))
  .then(console.log)
