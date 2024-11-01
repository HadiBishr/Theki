// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract MultiCallTest {


    mapping(uint256 => uint256) public getNumber;

    function test(uint256 _i) external {
        getNumber[_i] = _i;
    }

    
}