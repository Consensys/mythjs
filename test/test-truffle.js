'use strict'

var trufstuf = require('../lib/trufstuf.js')
var assert = require('assert')

assert(trufstuf.is_truffle_root('.') === false)
assert(trufstuf.is_truffle_root('./truffle-projects/IntegerOverflow') === true)
var buildDir = trufstuf.get_build_contracts_dir('./truffle-projects/IntegerOverflow')
assert(trufstuf.get_build_contracts_dir('./truffle-projects/IntegerOverflow') ===
       './truffle-projects/IntegerOverflow/build/contracts')
var jsonFiles = trufstuf.get_truffle_build_jsonFiles(buildDir)
var expected = ['integeroverflow.json', 'migrations.json', 'mythril.json']
assert(expected.length === jsonFiles.length &&
       expected.every(function (item, i) {
         return item === expected[i]
       }))
assert(trufstuf.guess_truffle_build_json(buildDir) ===
'IntegerOverflow.json')
