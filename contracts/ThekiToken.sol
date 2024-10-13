// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ThekiToken {

    uint256 public jobCounter; 
    uint256 public claimCounter = 0;

    // Structure of Claim
    struct Claim {
        uint256 id;
        address professional;
        string content;
        bool verified;
    }


    struct Job {
        uint256 id;                     // Job ID
        string jobTitle;                // Title of the job (e.g., NLP Engineer)
        string companyName;             // Name of the company posting the job
        string seniority;               // Seniority level (e.g., Senior, Mid-level, Junior)
        string department;              // Department (e.g., Engineering, Sales)
        string location;                // Location (e.g., Remote, New York, etc.)
        string workSchedule;            // Work schedule (e.g., Full-time, Part-time)

        /*
        * ==========================================
        *               Qualifications
        * ==========================================
        * Declare structs, mappings, and enums here.
        */

        // Skills
        string[] technicalSkills;       // List of required technical skills
        uint256[] techSkillExp;         // Years of experience required for each technical skill
        string[] softSkills;            // List of required soft skills
        uint256[] softSkillExp;         // Yeras of experience required for each soft skill



        // Experiences
        string[] industryExp;           // Industries with experience required
        uint256[] industryExpDur;       // Years of experience required in each industry
        string[] jobExp;                // Jobs or similar jobs requiring experience
        uint256[] jobExpDur;            // Years of experience required for each job

        
        // Projects
        string[] projects;              // Projects relating to certain skills or tools


        // Achievements
        string[] awards;                // List of awards or honors
        string[] certifications;        // List of certifications
        string[] patents;               // List of patents
        string[] publications;          // List of publications
        string[] securityClearances;    // Types of security clearances required

        // Endorsements
        uint256 endorsements;           // Total number of endorsements for required skills


        /*
        * ==========================================
        *                   Duties
        * ==========================================
        * Declare structs, mappings, and enums here.
        */

        string primaryDuties;       // Primary job duties
        string secondaryDuties;     // Secondary job duties
        string deliverables;        // Key deliverables
        string toolsTech;           // Tools or technologies required for duties


        /*
        * ==========================================
        *               Compensation
        * ==========================================
        * Declare structs, mappings, and enums here.
        */

        string salary;              // Salary range (e.g., "$100k-$120k")
        string bonus;               // Bonus details
        string benefits;            // Benefits offered (e.g., healthcare, vacation)


        /*
        * ==========================================
        *               Company Culture
        * ==========================================
        * Declare structs, mappings, and enums here.
        */

        string jobIntroHook;        // Introduction to the job role
        string companyProfile;      // Description of the company profile




        uint256 thekiScore;             // Theki score for the job (left as 0 initially)
    }

    
    mapping(uint256 => Claim) public claims;                        // Stores the details of the claim. User has to input their ID of the claim they have made. 
    mapping(address => uint256[]) public professionalClaims;        // Stores the ID of the claim each address has made
    mapping(uint256 => Job) public jobs;                            // Mapping from job Id to Job struct. 

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

    function createJob(
        string memory _companyName, 
        string memory _jobTitle, 
        string memory _jobAmount
    ) public {
        jobCounter++;   // Starts job counter at 1
        
        // Create a new Job struct and store it in the mapping

        
    }

}
