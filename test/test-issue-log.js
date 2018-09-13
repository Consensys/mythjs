// Tests  Mythril JSON output issue parsing
mythlib = require("../lib/mythlib.js")
var test = {
    "error": null,
    "issues": [
	{"address": 174, "code":
	 "count *= input",
	 "contract": "IntegerOverflow",
	 "debug": "calldata_IntegerOverflow[4]: 0xde9aa0007ffff9dbbb05d00001000207fffdffbfffbfbfbfffbfbfefbfbff7f6\nstorage_0: 0xff3717ddf147ba7fd6976a72ee859c9c251431c6dd4346e384e0fd941c87b69c\ncalldata_IntegerOverflow[0]: 0xa444f5e900000000000000000000000000000000000000000000000000000000\ncalldatasize_IntegerOverflow: 0x4\ncallvalue: 0x0\n",
	 "description": "A possible integer overflow exists in the function `run(uint256)`.\nThe addition or multiplication may result in a value higher than the maximum representable integer.", "filename": "/home/rocky/truffle/IntegerOverflow/contracts/IntegerOverflow.sol", "function": "run(uint256)", "lineno": 7, "title": "Integer Overflow", "type": "Warning"}
    ],
    "success": true};
mythlib.parse_mythril_issue(test.issues[0]);
