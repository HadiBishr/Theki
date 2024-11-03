// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract MultiCall {
    function multiCall(address[] calldata targets, bytes[] calldata data)
        external
        view
        returns (bytes[] memory)
    {
        require(targets.length == data.length, "target length != data length");

        bytes[] memory results = new bytes[](data.length);

        for (uint256 i; i < targets.length; i++) {
            (bool success, bytes memory result) = targets[i].staticcall(data[i]);
            require(success, "call failed");
            results[i] = result;
        }

        return results;
    }
}



// contract MultiCall {

//     uint256 public storedValue;
//     mapping(address => uint256) public mappingValue;


//     struct Call {
//         address target;
//         bytes callData;
//     }

//     // Function to execture multiple calls in a single transaction
//     function multiCall(Call[] memory calls) public returns (bytes[] memory returnData) {


//         returnData = new bytes[](calls.length);

//         // address originalCaller = msg.sender;

//         for (uint256 i = 0; i < calls.length; i++) {

//             // bytes memory updatedCallData = abi.encodePacked(originalCaller, calls[i].callData);

//             // Using .call() to make eternal calls to other calls
//             (bool success, bytes memory result) = calls[i].target.delegatecall(calls[i].callData);
//             require(success, "call failed"); // Revert the transaction if any call fails
//             returnData[i] = result;
//         }

//     }
// }