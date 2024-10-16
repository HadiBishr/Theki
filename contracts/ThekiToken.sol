// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;






contract ThekiToken {


 
    uint256 public claimCounter = 0;



    // Claim structure made in other child
    struct Claim {
        uint256 id;
        address professional;
        string content;
        bool verified; // Make this a string 
    }




    
    mapping(uint256 => Claim) public claims;                        // Stores the details of the claim. User has to input their ID of the claim they have made. 
    mapping(address => uint256[]) public professionalClaims;        // Stores the ID of the claim each address has made

    event ClaimCreated(uint256 id, address professional, string content);
    event ClaimVerified(uint256 id); 

    function createClaim(string memory _content) public {
        claimCounter++; 
        claims[claimCounter] = Claim(claimCounter, msg.sender, _content, false);
        professionalClaims[msg.sender].push(claimCounter);
        emit ClaimCreated(claimCounter, msg.sender, _content);
    }

    function verifyClaim(uint256 _id) public {
        // Only authorized verifiers can call this function
        // For simplicity, we'll allow any address to verify in this prototype
        claims[_id].verified = true;
        emit ClaimVerified(_id);
    }

    function getClaimsByProfessional(address _professional) public view returns (uint256[] memory) {
        return professionalClaims[_professional]; 
    }


    


    
  
}
