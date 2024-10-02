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


  

    struct JobTitle {
        string jobTitle;
        uint256 experienceMonths;
        bool verified;
    }

    struct ExperienceIndustry {
        string industryName;
        JobTitle[] jobTitles;
    }

    struct Experiences {
        ExperienceIndustry[] industries;
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
        uint[] memory _softExpYears

        // Experience
    ) public {

        Profile storage profile = profiles[NextProfileId];
        profile.name = _name;

        // Adding multiple techincal skills
        for (uint256 i = 0; i < _techSkills.length; i++) {
            profile.skills.technicalSkills.push(SkillDetails(_techSkills[i], _techExpYears[i], false));
        }

        // Adding multiple soft skills
        for (uint256 i = 0; i < _softSkills.length; i++) {
            profile.skills.softSkills.push(SkillDetails(_softSkills[i], _softExpYears[i], false));
        }

        NextProfileId++;

    }

}



