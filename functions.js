const fs = require('fs')
const path = require('path')

function filterText (text) {
  return (list) => list.filter((element) => element.endsWith(text))
}

function merge (rule) {
  return (element) => element.join(rule)
}

function mergeWords (words) {
  return Object.values(words.reduce((acc, word) => {
    const element = word.toLowerCase()
    const quantity = acc[element] ? acc[element].quantity + 1 : 1
    acc[element] = { element, quantity }

    return acc
  }, {}))
}

function orderWithNumber (element, order = 'asc') {
  return function (list) {
    const asc = (a, b) => a[element] - b[element]
    const desc = (a, b) => b[element] - a[element]

    return list.sort(order === 'asc' ? asc : desc)
  }
}

function part (rule) {
  return (element) => element.split(rule)
}

function readFile (address) {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        fs.readFileSync(address, { encoding: 'utf-8' }).toString()
      )
    } catch (error) { reject(error) }
  })
}

function readFiles (addresses) {
  return Promise.all(addresses.map((address) => readFile(address)))
}

function readFolder (address) {
  return new Promise((resolve, reject) => {
    try {
      resolve(
        fs.readdirSync(address).map((file) => path.join(address, file))
      )
    } catch (error) { reject(error) }
  })
}

function removeClean (list) {
  return list.filter((element) => element.trim())
}

function removeNumbers (list) {
  return list.filter((element) => {
    const num = parseInt(element.trim())
    return num !== num
  })
}

function removeTexts (text) {
  return (list) => list.filter(element => !element.includes(text))
}

function removeSymbols (symbols) {
  return (list) => list.map((element) =>
    symbols.reduce((acc, symbol) => acc.split(symbol).join(''), element)
  )
}

module.exports = {
  filterText,
  merge,
  mergeWords,
  orderWithNumber,
  part,
  readFiles,
  readFolder,
  removeClean,
  removeNumbers,
  removeTexts,
  removeSymbols
}
