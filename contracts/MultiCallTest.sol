// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;




contract MultiCallTest {

    uint256 public storedValue;
    mapping(address => uint256) public mappingValue;


    function setValue(uint256 newValue) public {
        storedValue = newValue;

        mappingValue[msg.sender] = storedValue;
    }


    function getValue() public view returns (uint256) {
        return storedValue;
    }

    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b;
    }




    // Function to execture multiple calls in a single transaction
    function multiCall(bytes[] calldata data) external returns (bytes[] memory returnData) {


        returnData = new bytes[](data.length);

        // address originalCaller = msg.sender;

        for (uint256 i = 0; i < data.length; i++) {

            // bytes memory updatedCallData = abi.encodePacked(originalCaller, calls[i].callData);

            // Using .call() to make eternal calls to other calls
            (bool success, bytes memory result) = address(this).delegatecall(data[i]);
            require(success, "call failed"); // Revert the transaction if any call fails
            returnData[i] = result;
        }

    }

    
}