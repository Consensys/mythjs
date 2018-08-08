"use strict"

var assert = require('assert');

var SourceMappingDecoder = require('remix-lib/src/sourceMappingDecoder.js')
var compilerInput = require('remix-lib/src/helpers/compilerHelper').compilerInput
var compiler = require('solc')

var SourceMappingDecoder = require('remix-lib/src/sourceMappingDecoder.js')

exports.compileContract = function(contracts) {
    var output = compiler.compileStandardWrapper(compilerInput(contracts))
    return JSON.parse(output)
}

exports.isVariableDeclaration = function(instIndex, sourceMap, ast) {
    var sourceMappingDecoder = new SourceMappingDecoder()
    return sourceMappingDecoder.findNodeAtInstructionIndex('VariableDeclaration',
							   instIndex, sourceMap, ast)
}

exports.isDynamicArray = function(node) {
    var attrib = node.attributes
    // FIXME: do we want to check:
    // constant: false
    // storageLocation: 'default'
    return (attrib.stateVariable &&
	    attrib.visibility == 'public' &&
	    node.children && node.children[0].name == 'ArrayTypeName')
}
