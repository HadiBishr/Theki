// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserProfileManager.sol";



contract JobManager {

    uint256 public jobCounter; 
    uint256[] public jobIds;

    /*
    * ==========================================
    *               Qualifications
    * ==========================================
    * Declare structs, mappings, and enums here.
    */

    // struct SkillRequirement {
    //     string skillName;               // Name of the skill required (e.g., Python)
    //     uint256 experience;             // Years of experience required for the skill
    // }

    // struct ExperienceRequirement {
    //     string industry;                // Industry of experience required (e.g, AI Research)
    //     string jobTitle;                // Job title required (e.g., Software Engineer)
    //     uint256 experience;             // Yerass of experience required in the industry/job
    // }

    // struct ProjectRequirement {
    //     string name;                    // Name of the project
    //     string[] skillsApplied;         // Skills required for the project
    //     string[] toolsUsed;             // Tools required for the project
    // }


    // struct AchievementRequirement { 
    //     string content;                 // Content of the award, certification, patent, publication, or clearence
    //     string industry;                // Industry relating to the achievement
    //     string[] skill;                   // Skill/s relating to the achievement
    // }   


    // // Main Qualifications struct
    // struct JobQualifications {
    //      // Skills
    //     SkillRequirement[] technicalSkills;         // List of required technical skills
    //     SkillRequirement[] softSkills;              // List of required soft skills
    //     // Experiences
    //     ExperienceRequirement[] experiences;        // List of required experiences
    //     // Projects
    //     ProjectRequirement[] projects;              // List of required projects
    //     // Achievements
    //     AchievementRequirement[] achievements;      // List of required achievements (e.g., awards, patents)
    //     // Endorsements
    //     uint256 endorsements;                       // Total number of endorsements for required skills

    // }

    /*
    * ==========================================
    *                   Duties
    * ==========================================
    * Declare structs, mappings, and enums here.
    */

    // struct Duties {
    //     string primaryDuties;           // Primary job duties
    //     string secondaryDuties;         // Secondary job duties
    //     string deliverables;            // Key deliverables
    //     string toolsTech;               // Tools or technologies required for duties
    // }


    /*
    * ==========================================
    *               Compensation
    * ==========================================
    * Declare structs, mappings, and enums here.
    */


    // struct Compensation {
    //     string salary;                  // Salary range (e.g., "$100k-$120k")
    //     string bonus;                   // Bonus details
    //     string benefits;                // Benefits offered (e.g., healthcare, vacation)
    // }


    /*
    * ==========================================
    *               Company Culture
    * ==========================================
    * Declare structs, mappings, and enums here.
    */

    // struct CompanyCulture {
    //     string jobIntroHook;            // Introduction to the job role
    //     string companyProfile;          // Description of the company profile
    // }


    /*
    * ==========================================
    *           Basic Job Information
    * ==========================================
    * Declare structs, mappings, and enums here.
    */


    // Basic Job Information
    struct BasicInfo {
        string jobTitle;                // Title of the job (e.g., NLP Engineer)
        string companyName;             // Name of the company posting the job
        string seniority;               // Seniority level (e.g., Senior, Mid-level, Junior)
        string department;              // Department (e.g., Engineering, Sales)
        string location;                // Location (e.g., Remote, New York, etc.)
        string workSchedule;            // Work schedule (e.g., Full-time, Part-time)
        string industry;
    }


    // Main job struct
    struct Job {
        uint256 id;                     // Job ID      
        address employer;               // Address of the employer
        string cid;                     // CID of where ipfs data is stored.
        BasicInfo basicInfo;            // Basic Information about the job
        uint256 thekiScore;             // Theki score for the job (left as 0 initially)
    }

    mapping(uint256 => Job) public jobs;                            // Mapping from job Id to Job struct. This is where you store all jobs made



    function createJob(
        string memory _cid,
        bytes memory _encodedBasicInfo
    ) public {
        jobCounter++;

        Job storage newJob = jobs[jobCounter];

        newJob.id = jobCounter;
        newJob.employer = msg.sender;
        newJob.cid = _cid;
        newJob.thekiScore = 0;

        // newJob.basicInfo = _basicInfo;


        (string memory _jobTitle, string memory _companyName, string memory _seniority, string memory _department, string memory _location, string memory _workSchedule, string memory _industry) = abi.decode(
            _encodedBasicInfo,
            (string, string, string, string, string, string, string)
        );

        BasicInfo memory basicInfo = BasicInfo(_jobTitle, _companyName, _seniority, _department, _location, _workSchedule, _industry);


        newJob.basicInfo = basicInfo;

        



        jobIds.push(jobCounter); // Add the job ID to the array


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