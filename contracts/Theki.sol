// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Theki {

    uint256 public NextProfileId = 1;


/*
* ==========================================
*               DATA STRUCTURES
* ==========================================
* Declare structs, mappings, and enums here.
*/

    /*
    * ==========================================
    *               Skills
    * ==========================================
    * Declare structs, mappings, and enums here.
    */



    struct SkillDetails {
        string skillName;
        uint256 experienceMonths;
        bool verified;
    }


    struct Skills {
        SkillDetails[] technicalSkills;
        SkillDetails[] softSkills;
    }

    /*
    * ==========================================
    *               Experiences
    * ==========================================
    * Declare structs, mappings, and enums here.
    */


  
    // Details of single job in single industry
    struct JobDetails {
        string jobTitle; 
        uint256 experienceMonths;
        bool verified;
    }

    struct ExperienceIndustry {
        string industryName; // Industry name
        JobDetails[] jobTitles; // Job Titles in that particular industry
    }

    struct Experiences {
        ExperienceIndustry[] industries; // This would hold multiple industries
    }


    /*
    * ==========================================
    *               Final Profile Struct
    * ==========================================
    * Declare structs, mappings, and enums here.
    */

    struct Profile {
        string name; // Proffesional Name
        Skills skills;
        Experiences experiences;
    }






    mapping(uint256 => Profile) public profiles;








    /*
    * ==========================================
    *               MAIN CONTRACT
    * ==========================================
    * Define the main contract logic and functions here.
    */

    function addProfile(
        // Skills
        string memory _name,
        string[] memory _techSkills, 
        uint[] memory _techExpYears, 
        string[] memory _softSkills, 
        uint[] memory _softExpYears,

        // Experiences
        string[] memory _industryNames, // A string array to store several industries a person might have been in
        string[][] memory _jobDetails, // A nested array for each job title under a industry
        uint[][] memory _experienceMonth // A nested array of experience for each job title
    ) public {

    // Grabbing single profile to make working with it easier

        Profile storage profile = profiles[NextProfileId];
        profile.name = _name;

    // Creating Skills

        // Adding multiple techincal skills
        for (uint256 i = 0; i < _techSkills.length; i++) {
            profile.skills.technicalSkills.push(SkillDetails(_techSkills[i], _techExpYears[i], false));
        }

        // Adding multiple soft skills
        for (uint256 i = 0; i < _softSkills.length; i++) {
            profile.skills.softSkills.push(SkillDetails(_softSkills[i], _softExpYears[i], false));
        }

        NextProfileId++;


    // Creating Experiences

        for (uint256 i = 0; i < _industryNames.length; i++) {
            // Create a temporary memory array to store job titles for the current industry
            JobDetails[] memory jobDetails = new JobDetails[](_jobDetails[i].length); // After an array is completed for jobDetails, that would be an array of all job titles for that single industry i


            // Loop through job titles for the current industry
            for (uint256 j = 0; j < _jobDetails[i].length; j++) { // _jobDetails[i] returns an array of job titles for the industry i. 
                jobDetails[j] = JobDetails(_jobDetails[i][j], _experienceMonths[i][j], false);
            }


            // Now push the entire industry with its job titles into storage
            profile.experiences.industries.push(ExperienceIndustry({
                industryName: _industryNames[i],
                jobTitles: jobDetails
            }));


        
        }


    }


}




// Edit Profile
