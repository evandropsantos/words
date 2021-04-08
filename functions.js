const fs = require('fs')
const path = require('path')

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
  readFolder
}
