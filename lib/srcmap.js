"use strict"

var SourceMappingDecoder = require('remix-lib/src/sourceMappingDecoder.js')
var compiler = require('solc')
var compilerInput = require('remix-lib/src/helpers/compilerHelper').compilerInput


var contracts = `pragma solidity ^0.4.24;

contract test {
    function f1() public pure returns (uint) {
        uint t = 4;
        return t;
    }

    function f2() public pure {

    }
}
`

var output = compiler.compileStandardWrapper(compilerInput(contracts))
output = JSON.parse(output)

console.log(output)

var sourceMappingDecoder = new SourceMappingDecoder()
var node = sourceMappingDecoder
    .findNodeAtInstructionIndex('FunctionDefinition', 2,
				output.contracts['test.sol']['test']
				.evm.deployedBytecode.sourceMap, output.sources['test.sol'])

node = sourceMappingDecoder
    .findNodeAtInstructionIndex('FunctionDefinition', 80, output.contracts['test.sol']['test']
				.evm.deployedBytecode.sourceMap, output.sources['test.sol'])
console.log(node)

var testSourceMapping = {}

var sourceMapping = require('../resources/sourceMapping')
var sourceMappingDecoder = new SourceMappingDecoder()
var result = sourceMappingDecoder.decompressAll(sourceMapping.mapping)
console.log(result)
testSourceMapping[21] = result[21]
testSourceMapping['last'] = result['last']
result = sourceMappingDecoder.atIndex(22, sourceMapping.mapping)
console.log(result)
