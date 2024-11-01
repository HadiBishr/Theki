// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



contract MultiCall {
    // Function to execture multiple calls in a single transaction
    function multiCall(
        address[] calldata targets,         // Array of contract addresses
        bytes[] calldata data               // Array of encded function calls
    ) external returns (bytes[] memory) {
        // Ensure targets and datra have the same length
        require(targets.length == data.length, "Target length and Data Length do not match");

        bytes[] memory results = new bytes[](data.length);

        for (uint256 i = 0; i < targets.length; i++) {
            // Using .call() to make eternal calls to other calls
            (bool success, bytes memory result) = targets[i].delegatecall(data[i]);
            require(success, "call failed"); // Revert the transaction if any call fails
            results[i] = result;
        }

        return results;

    }
}