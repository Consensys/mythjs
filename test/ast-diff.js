var srcmap = require('../lib/srcmap.js')

var fs = require('fs')
var buildObj = JSON.parse(fs.readFileSync('./truffle-projects/storage_arrays/build/contracts/PublicStorageArray.json', 'utf8'))
var output = srcmap.compileContract(buildObj.source)
var ast = output.sources['test.sol']
console.log(ast)

var legacyAST = buildObj.legacyAST
console.log(legacyAST)
