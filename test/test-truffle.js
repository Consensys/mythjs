"use strict"

var trufstuf = require("../lib/trufstuf.js")
var assert = require('assert');

assert(trufstuf.is_truffle_root('.') == false)
assert(trufstuf.is_truffle_root('./truffle-projects/IntegerOverflow') == true);
var build_dir = trufstuf.get_build_contracts_dir('./truffle-projects/IntegerOverflow')
assert(trufstuf.get_build_contracts_dir('./truffle-projects/IntegerOverflow')
       == './truffle-projects/IntegerOverflow/build/contracts')
var json_files = trufstuf.get_truffle_build_json_files(build_dir);
var expected = [ 'integeroverflow.json', 'migrations.json', 'mythril.json'];
assert(expected.length == json_files.length &&
       expected.every(function(item, i) {
	   return item === expected[i];
       }));
assert (trufstuf.guess_truffle_build_json(build_dir)
	== 'IntegerOverflow.json')
