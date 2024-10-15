// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ThekiToken {

    uint256 public jobCounter; 
    uint256 public userCounter;
    uint256 public claimCounter = 0;
    uint256[] public jobIds;

    // Structure of Claim
    struct Claim {
        uint256 id;
        address professional;
        string content;
        bool verified; // Make this a string 
    }

    // Basic Job Information
    struct BasicInfo {
        string jobTitle;                // Title of the job (e.g., NLP Engineer)
        string companyName;             // Name of the company posting the job
        string seniority;               // Seniority level (e.g., Senior, Mid-level, Junior)
        string department;              // Department (e.g., Engineering, Sales)
        string location;                // Location (e.g., Remote, New York, etc.)
        string workSchedule;            // Work schedule (e.g., Full-time, Part-time)
    }


    /*
    * ==========================================
    *               Qualifications
    * ==========================================
    * Declare structs, mappings, and enums here.
    */

    struct Qualifications {
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

    }

    /*
    * ==========================================
    *                   Duties
    * ==========================================
    * Declare structs, mappings, and enums here.
    */

    struct Duties {
        string primaryDuties;           // Primary job duties
        string secondaryDuties;         // Secondary job duties
        string deliverables;            // Key deliverables
        string toolsTech;               // Tools or technologies required for duties
    }


    /*
    * ==========================================
    *               Compensation
    * ==========================================
    * Declare structs, mappings, and enums here.
    */


    struct Compensation {
        string salary;                  // Salary range (e.g., "$100k-$120k")
        string bonus;                   // Bonus details
        string benefits;                // Benefits offered (e.g., healthcare, vacation)
    }


     /*
    * ==========================================
    *               Company Culture
    * ==========================================
    * Declare structs, mappings, and enums here.
    */

    struct CompanyCulture {
        string jobIntroHook;            // Introduction to the job role
        string companyProfile;          // Description of the company profile
    }

    struct Job {
        uint256 id;                     // Job ID      
        BasicInfo basicInfo;            // Basic Information about the job
        Qualifications qualifications;  // Qualifications for the job
        Duties duties;                  // Duties and responsibilities
        Compensation compensation;      // Compensation details
        CompanyCulture companyCulture;  // Company culture and overview
        uint256 thekiScore;             // Theki score for the job (left as 0 initially)
    }






    struct Skill {
        string skillName;               // Name of the skill (e.g., Python, Leadership)
        uint256 experience;             // Experience in years of this particular skill
        bool verified;                  // Verification status for the skill
    }

    struct Experience { 
        string industry;                // Industry of experience (e.g., AI Research)
        string jobTitle;                // Job Title in the industry
        uint256 experience;             // Years of experience in the industry
        bool verified;                  // Verification status
    }

    struct Project {
        string name;                    // Name of the project
        string link;                    // Like to the project
        string[] skillsApplied;         // Skills applied to project
        string[] toolsUsed;             // Technology/tools used
        string role;                    // Role in the project
        string description;             // Description of the process
        bool verified;                  // Verification status
    }

    struct Achievment {
        string content;                 // Content of the award, certification, patent, publication, or clearence
        string industry;                // Industry of achievment
        string skill;                   // Skill used in achievment
        bool verified;                  // Verification status of achievment
    }

    struct Endorsement {
        string content;
        string endorser;
        string[] skillsRelated;
        bool verified;
    }   



    struct UserProfile {
        uint256 id;
        Skill[] technicalSkills;
        Skill[] softSkills;
        Experience[] experiences;
        Project[] projects;
        Achievment[] achievments;
        Endorsement[] endorsements;
        Claim[] claims;
    }   





    
    mapping(uint256 => Claim) public claims;                        // Stores the details of the claim. User has to input their ID of the claim they have made. 
    mapping(address => uint256[]) public professionalClaims;        // Stores the ID of the claim each address has made
    mapping(uint256 => Job) public jobs;                            // Mapping from job Id to Job struct. 
    mapping(uint256 => UserProfile) public userProfiles;
    mapping(address => uint256) public userId;

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
        BasicInfo memory _basicInfo,
        Qualifications memory _qualifications,
        Duties memory _duties, 
        Compensation memory _compensation, 
        CompanyCulture memory _companyCulture
    ) public {
        jobCounter++;

        // Create a new Job struct and store it in the mapping
        jobs[jobCounter] = Job({
            id: jobCounter,
            basicInfo: _basicInfo,
            qualifications: _qualifications,
            duties: _duties,
            compensation: _compensation,
            companyCulture: _companyCulture,
            thekiScore: 0 // Intial score set to 0
        });

        jobIds.push(jobCounter); // Add the job ID to the array


    }


    function createUserProfile(
        Skill[] memory _technicalSkills,
        Skill[] memory _softSkills,
        Experience[] memory _experiences,
        Project[] memory _projects,
        Achievment[] memory _achievments,
        Endorsement[] memory _endorsements,
        Claim[] memory _claims
    ) public {
        userCounter++;

        userProfiles[userCounter] = UserProfile({
            id: userCounter,
            technicalSkills: _technicalSkills,
            softSkills: _softSkills,
            experiences: _experiences,
            projects: _projects,
            achievments: _achievments,
            endorsements: _endorsements,
            claims: _claims
        });

        userId[msg.sender] = userCounter;


    }

    // Getter function to get all Job IDs
    function getAllJobIds() public view returns (uint256[] memory) {
        return jobIds;
    }

    // Getter function go get a specific job
    function getJob(uint256 jobId) public view returns (Job memory) {
        return jobs[jobId];
    }

  
}
