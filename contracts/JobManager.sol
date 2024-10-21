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

    struct SkillRequirement {
        string skillName;               // Name of the skill required (e.g., Python)
        uint256 experience;             // Years of experience required for the skill
    }

    struct ExperienceRequirement {
        string industry;                // Industry of experience required (e.g, AI Research)
        string jobTitle;                // Job title required (e.g., Software Engineer)
        uint256 experience;             // Yerass of experience required in the industry/job
    }

    struct ProjectRequirement {
        string name;                    // Name of the project
        string[] skillsApplied;         // Skills required for the project
        string[] toolsUsed;             // Tools required for the project
    }


    struct AchievementRequirement { 
        string content;                 // Content of the award, certification, patent, publication, or clearence
        string industry;                // Industry relating to the achievement
        string[] skill;                   // Skill/s relating to the achievement
    }   


    // Main Qualifications struct
    struct JobQualifications {
         // Skills
        SkillRequirement[] technicalSkills;         // List of required technical skills
        SkillRequirement[] softSkills;              // List of required soft skills
        // Experiences
        ExperienceRequirement[] experiences;        // List of required experiences
        // Projects
        ProjectRequirement[] projects;              // List of required projects
        // Achievements
        AchievementRequirement[] achievements;      // List of required achievements (e.g., awards, patents)
        // Endorsements
        uint256 endorsements;                       // Total number of endorsements for required skills

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
    }


    // Main job struct
    struct Job {
        uint256 id;                     // Job ID      
        BasicInfo basicInfo;            // Basic Information about the job
        JobQualifications qualifications;  // Qualifications for the job
        Duties duties;                  // Duties and responsibilities
        Compensation compensation;      // Compensation details
        CompanyCulture companyCulture;  // Company culture and overview
        uint256 thekiScore;             // Theki score for the job (left as 0 initially)
    }

    mapping(uint256 => Job) public jobs;                            // Mapping from job Id to Job struct. This is where you store all jobs made



    function createJob(
        BasicInfo memory _basicInfo,
        JobQualifications memory _qualifications,
        Duties memory _duties, 
        Compensation memory _compensation, 
        CompanyCulture memory _companyCulture
    ) public {
        jobCounter++;

        Job storage newJob = jobs[jobCounter];

        newJob.id = jobCounter;
        newJob.basicInfo = _basicInfo;
        newJob.duties = _duties;
        newJob.compensation = _compensation;
        newJob.companyCulture = _companyCulture; 

        // Everything below deals with iterating over the _qualifications and pushing it into the newJob, and then into the mapping
        for (uint256 i = 0; i < _qualifications.technicalSkills.length; i++) {
            newJob.qualifications.technicalSkills.push(_qualifications.technicalSkills[i]);
        }

        for (uint256 i = 0; i < _qualifications.softSkills.length; i++) {
            newJob.qualifications.softSkills.push(_qualifications.softSkills[i]);
        }

        for (uint256 i = 0; i < _qualifications.experiences.length; i++) {
            newJob.qualifications.experiences.push(_qualifications.experiences[i]);
        }

        for (uint256 i = 0; i < _qualifications.projects.length; i++) {
            newJob.qualifications.projects.push(_qualifications.projects[i]);
        }

        for (uint256 i = 0; i < _qualifications.achievements.length; i++) {
            newJob.qualifications.achievements.push(_qualifications.achievements[i]);
        }

        newJob.qualifications.endorsements = _qualifications.endorsements;

        



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