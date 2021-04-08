const path = require('path')
const fn = require('./functions')

fn.readFolder(path.join(__dirname, 'subtitle'))
  .then((files) => fn.filterText(files, '.srt'))
  .then(console.log)
