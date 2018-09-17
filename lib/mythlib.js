'use strict'

const armlet = require('armlet')
const path = require('path')
const srcmap = require('./srcmap.js')

exports.parseMythrilIssue = function (issue) {
  const fields = ['type', 'contract', 'function', 'code', 'address', 'description']
  for (let i in fields) {
    let field = fields[i]
    if (issue[field]) {
      console.log(`${field}: ${issue[field]}`)
    }
  }
}

exports.parseMythrilOutput = function (issues, buildObj) {
  // FIXME: we are using remix for parsing which uses
  // a different AST format than truffle's JSON.
  // For now we'll compile the contract.

  let output = srcmap.compileContract(buildObj.source)
  let ast = output.sources['test.sol']
  console.log(ast)

  let legacyAST = buildObj.legacyAST
  console.log(legacyAST)

  let sourceMap = buildObj.deployedSourceMap
  for (let i in issues) {
    let issue = issues[i]
    let node = srcmap.isVariableDeclaration(issue.address, sourceMap, ast)
    if (node && srcmap.isDynamicArray(node)) {
      console.log(`skipping issue around dynamic array`)
    } else {
      parseMythrilIssue(issue)
    }
  }
}

exports.main = function (argv) {
  let program = require('commander')
  let solidityFile
  program
    .version('1.0.0')
    .option('-t, --truffle [truffle-root]',
      'Truffle project directory')

  program.on('--help', function () {
    console.log(`
  run mythril on a truffle project or solidity file`)
  })

  program.parse(argv)

  let buildDir
  let buildJson
  if (program.truffle) {
    let path = require('path')
    let trufstuf = require('./trufstuf')
    if (typeof program.truffle === 'boolean') {
      program.truffle = '.'
    }
    buildDir = trufstuf.getBuildContractsDir(program.truffle)
    let contractsDir = trufstuf.getContractsDir(program.truffle)
    console.log(`You gave truffle project root: ${program.truffle}`)
    console.log(`Build directory is : ${buildDir}`)
    // FIXME: Encapsulate solidity JSON file name to .sol file in contracts?
    buildJson = trufstuf.guessTruffleBuildJson(buildDir)
    let solidityFileBase = path.basename(buildJson, '.json')
    solidityFile = path.join(contractsDir, solidityFileBase + '.sol')
    console.log(`Solidity file is : ${solidityFile}`)
  } else {
    console.log(`No truffle project given`)
  }

  const client = new armlet.Client(
    {
      apiKey: process.env.MYTHRIL_API_KEY,
      userEmail: process.env.MYTHRIL_API_KEY || 'bogus@example.com'
    })

  if (buildDir) {
    let buildJsonPath = path.join(buildDir, buildJson)
    console.log(`Reading ${buildJsonPath}`)
    const fs = require('fs')
    const buildObj = JSON.parse(fs.readFileSync(buildJsonPath, 'utf8'))

    client.analyze({bytecode: buildObj.deployedBytecode})
      .then(issues => {
        exports.parseMythrilOutput(issues, buildObj)
        // console.log(issues)
      }).catch(err => {
        console.log(err)
      })
  }

  /**
  let args = ['-x', '-o', 'json', solidityFile]
  const { spawn } = require('child_process')
  const mythCmd = spawn('myth', args)
  mythCmd.stdout.on('data', data => {
    let obj = JSON.parse(data)
    var buildObj
    if (buildDir) {
      let buildJsonPath = path.join(buildDir, buildJson)
      console.log(`Reading ${buildJsonPath}`)
      let fs = require('fs')
      buildObj = JSON.parse(fs.readFileSync(buildJsonPath, 'utf8'))
    }
    exports.parseMythrilOutput(obj.issues, buildObj)
    // console.log( `stdout: ${data}` );
  })

  mythCmd.stderr.on('data', data => {
    console.log(`stderr: ${data}`)
  })

  mythCmd.on('close', code => {
    console.log(`child process exited with code ${code}`)
  })
  **/
}

function parseMythrilIssue (issue) {
  // a stub
}
