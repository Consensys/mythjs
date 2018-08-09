pragma solidity ^0.4.23;

contract IntegerOverflow {
    uint public count = 1955;

    function run(uint256 input) public {
        count *= input;
    }
}
