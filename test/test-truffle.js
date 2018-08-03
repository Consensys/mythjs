trufstuf = require("../lib/trufstuf.js")
assert = require('assert');

assert(trufstuf.is_truffle_root('.') == false);
assert(trufstuf.is_truffle_root('./sample-truffle') == true);
assert(trufstuf.get_build_contracts_dir('./sample-truffle')
       == './sample-truffle/build/contracts');
