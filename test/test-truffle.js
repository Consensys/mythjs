"use strict"

var trufstuf = require("../lib/trufstuf.js")
var assert = require('assert');

assert(trufstuf.is_truffle_root('.') == false)
assert(trufstuf.is_truffle_root('./sample-truffle') == true);
var build_dir = trufstuf.get_build_contracts_dir('./sample-truffle')
assert(trufstuf.get_build_contracts_dir('./sample-truffle')
       == './sample-truffle/build/contracts')
var json_files = trufstuf.get_truffle_build_json_files(build_dir);
var expected = [ 'integeroverflow.json', 'migrations.json', 'mythril.json'];
assert(expected.length == json_files.length &&
       expected.every(function(item, i) {
	   return item === expected[i];
       }));
assert (trufstuf.guess_truffle_build_json(build_dir)
	== 'IntegerOverflow.json')
