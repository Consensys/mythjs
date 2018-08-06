"use strict"

const { spawn } = require( 'child_process' );

function parse_mythril_issue(issue) {
    const fields = ['type', 'contract', 'function', 'code', 'address', 'description'];
    for (var i in fields) {
         var field = fields[i];
         if (issue[field]) {
             console.log(`${field}: ${issue[field]}`);
         }
    }
}

exports.parse_mythril_output = function(obj, build_obj) {
    if (build_obj) {
	console.log("WOOT!");
    }
    for (var i in obj.issues) {
	parse_mythril_issue(obj.issues[i]);
    }
}

exports.main = function(argv) {
    var program = require('commander');
    var solidity_file;
    program
	.version('1.0.0')
	.option('-s, --solidity <file>',
		'Solidity file')
	.option('-t, --truffle [truffle-root]',
		'Truffle project directory');

    program.on('--help', function(){
	console.log(`
  run mythril on a truffle project or solidity file`);
    });

    program.parse(argv);

    var build_dir;
    var build_json;
    if (program.truffle) {
	var path = require('path')
	var trufstuf = require('./trufstuf');
	if (typeof program.truffle == 'boolean') {
	    program.truffle = '.'
	}
	build_dir = trufstuf.get_build_contracts_dir(program.truffle)
	var contracts_dir = trufstuf.get_contracts_dir(program.truffle)
	console.log(`You gave truffle project root: ${program.truffle}`)
	console.log(`Build directory is : ${build_dir}`);
	// FIXME: Encapsulate solidity JSON file name to .sol file in contracts?
	build_json = trufstuf.guess_truffle_build_json(build_dir);
	var solidity_file_base = path.basename(build_json, '.json');
	solidity_file =  path.join(contracts_dir, solidity_file_base + '.sol')
	console.log(`Solidity file is : ${solidity_file}`);
    } else if (program.solidity) {
	console.log(`You gave solidity file: ${program.solidity}`)
	solidity_file = program.solidity;
    } else {
	console.log(`No options given`)
    }
    var args = ['-x', '-o', 'json', solidity_file];
    const myth_cmd = spawn( 'myth', args )
    myth_cmd.stdout.on( 'data', data => {
	var obj = JSON.parse(data);
	var build_obj;
	if (build_dir) {
	    var build_json_path = path.join(build_dir, build_json)
	    console.log(`Reading ${build_json_path}`)
	    var fs = require('fs')
	    build_obj = JSON.parse(fs.readFileSync(build_json_path, 'utf8'))
	}
	exports.parse_mythril_output(obj, build_obj)
	// console.log( `stdout: ${data}` );
    } );

    myth_cmd.stderr.on( 'data', data => {
	console.log( `stderr: ${data}` )
    } );

    myth_cmd.on( 'close', code => {
	console.log( `child process exited with code ${code}` )
    } );
}
