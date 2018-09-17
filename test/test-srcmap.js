'use strict'

var assert = require('assert')

var srcmap = require('../lib/srcmap.js')
var contract = `pragma solidity ^0.4.22;

contract PublicStorageArray {
    bytes32[] public STATES = [bytes32(0)];
}
`

var output = srcmap.compileContract(contract)

assert(output)

var sourceMap = output.contracts['test.sol']['PublicStorageArray']
  .evm.deployedBytecode.sourceMap
var node = srcmap.isVariableDeclaration(151, sourceMap, output.sources['test.sol'])

assert(node)
console.log(node)
assert(srcmap.isDynamicArray(node))
