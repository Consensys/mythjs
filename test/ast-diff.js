var srcmap = require("../lib/srcmap.js")

var fs = require('fs')
var build_obj = JSON.parse(fs.readFileSync('./truffle-projects/storage_arrays/build/contracts/PublicStorageArray.json', 'utf8'))
var output = srcmap.compileContract(build_obj.source)
var ast = output.sources['test.sol']
console.log(ast)

var legacyAST = build_obj.legacyAST
console.log(legacyAST)
