"use strict";

const { spawn } = require( 'child_process' );

function parse_mythril_issue(issue) {
    const fields = ['contract', 'function', 'code', 'address', 'description'];
    for (var i=1; i<fields.length; i++) {
         var field = fields[i];
         if (issue[field]) {
             console.log(`${field}: ${issue[field]}`);
         }
    }
}

exports.parse_mythril_output = function(obj) {
    for (var i=0; i < obj.issues.length; i++) {
	parse_mythril_issue(obj.issues[i]);
    }
}

exports.main = function(argv) {
    if (argv.len < 1) {
	console.log("Expecting arguments\n");
	return;
    }
    argv.push('-x', '-o', 'json')
    console.log(`Running myth -x -o json ${argv[0]}`);
    const myth_cmd = spawn( 'myth', argv );
    myth_cmd.stdout.on( 'data', data => {
	var obj = JSON.parse(data);
	exports.parse_mythril_output(obj);
	// console.log( `stdout: ${data}` );
    } );

    myth_cmd.stderr.on( 'data', data => {
	console.log( `stderr: ${data}` );
    } );

    myth_cmd.on( 'close', code => {
	console.log( `child process exited with code ${code}` );
    } );
}
