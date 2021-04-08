const fs = require('fs')
const path = require('path')

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

module.exports = {
  readFiles,
  readFolder
}
