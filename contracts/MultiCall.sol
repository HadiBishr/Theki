// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract MultiCall {
    // Function to execture multiple calls in a single transaction
    function multiCall(
        address[] calldata targets,         // Array of contract addresses
        bytes[] calldata data               // Array of encded function calls
    ) external payable {
        // Ensure targets and datra have the same length
        require(targets.length == data.length, "Target length and Data Length do not match");

        for (uint i = 0; i < targets.length; i++) {
            // Using .call() to make eternal calls to other calls
            (bool success, bytes memory returnData) = targets[i].call(data[i]);
            require(success, string(returnData)); // Revert the transaction if any call fails
        }

    }
}