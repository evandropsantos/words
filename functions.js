const fs = require('fs')
const path = require('path')

function filterText (text) {
  return (list) => list.filter((element) => element.endsWith(text))
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
  return list.filter((item) => item.trim())
}

function removeNumbers (list) {
  return list.filter((element) => {
    const num = +element.trim()
    return num !== num
  })
}

function removeTexts (text) {
  return (list) => list.filter(item => !item.includes(text))
}

function removeSymbols (symbols) {
  return (list) => list.map((element) => {
    let text = element
    
    symbols.forEach((symbol) => {
      text = text.split(symbol).join('')
    })

    return text
  })
}

module.exports = {
  filterText,
  readFiles,
  readFolder,
  removeClean,
  removeNumbers,
  removeTexts,
  removeSymbols
}
