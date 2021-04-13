const path = require('path')
const fn = require('./functions')

const files = path.join(__dirname, 'subtitle')
const symbols = ['.', '?', '-', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')']

function mergeWords () {
  
}

fn.readFolder(files)
  .then(fn.filterText('.srt'))
  .then(fn.readFiles)
  .then(fn.merge(' '))
  .then(fn.part('\n'))
  .then(fn.removeClean)
  .then(fn.removeTexts('-->'))
  .then(fn.removeNumbers)
  .then(fn.removeSymbols(symbols))
  .then(fn.merge(' '))
  .then(fn.part(' '))
  .then(fn.removeClean)
  .then(console.log)
