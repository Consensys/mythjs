// Truffle related code
"use strict"

var fs = require('fs')
var path = require('path')
var assert = require('assert')

// Directories that must be in a truffle project
const TRUFFLE_ROOT_DIRS = ['contracts', 'migrations']

exports.is_truffle_root = function(path) {
    for (var i in TRUFFLE_ROOT_DIRS) {
	var dir = `${path}/${TRUFFLE_ROOT_DIRS[i]}`;
		if (! fs.existsSync(dir)) {
			return false
		}
		var stat = fs.statSync(dir);
		if (!stat || !stat.isDirectory()) {
			return false;
		}
	}
	return true
}

exports.get_build_contracts_dir = function(path) {
    assert(exports.is_truffle_root(path))
    return `${path}/build/contracts`
}
exports.get_contracts_dir = function(path) {
    assert(exports.is_truffle_root(path))
    return `${path}/contracts`
}


exports.get_truffle_build_json_files = function(directory) {

    var files = fs.readdirSync(directory)
    var result = [];
    for (var i in files) {
	if (path.extname(files[i]) == ".json" && path.basename(files[i])[0] != ".") {
	    result.push(files[i]);
	}
    }
    return result
}

exports.guess_truffle_build_json = function(directory) {
    var json_paths = exports.get_truffle_build_json_files(directory);
    var json_paths_filtered = []
    for (var i in json_paths) {
        if ((path.basename(json_paths[i]) != 'Migrations.json') &&
	    (path.basename(json_paths[i]) != 'mythril.json')) {
	    json_paths_filtered.push(json_paths[i])
	}
    }
    var json_path;
    if (json_paths_filtered.length >= 1) {
        json_path = json_paths_filtered[0]
    } else {
        json_path = json_paths[0]
    }
    return json_path
}
