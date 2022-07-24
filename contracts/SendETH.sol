// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract SendETH{
    address owner;

    constructor(){
        owner = msg.sender;
    }

    function send(address payable _payee) payable public{
        require(msg.value > 0, "You can't send 0 eth");
        _payee.transfer(msg.value);
    }
}
