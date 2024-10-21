// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract UserProfileManager {

    uint256 public userCounter;

    struct Claim {
        uint256 id;
        address professional;
        string content;
        bool verified; // Make this a string 
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

    struct Achievement {
        string content;                 // Content of the award, certification, patent, publication, or clearence
        string industry;                // Industry of achievement
        string skill;                   // Skill used in achievement
        bool verified;                  // Verification status of achievement
    }

    struct Endorsement {
        string content;
        string endorser;
        string[] skillsRelated;
        bool verified;
    }   



    struct UserProfile {
        uint256 id;                     // A unique id for a user
        string name;                    // Name of user
        Skill[] technicalSkills;        // A list of all technical skills a user has
        Skill[] softSkills;             // A list of all soft skills a user has
        Experience[] experiences;       // A list of all experiences a user has
        Project[] projects;             // A list of all projects a user has
        Achievement[] achievements;       // A list of all achievements a user has
        Endorsement[] endorsements;     // A list of all endorsements a user has
        Claim[] claims;                 // A list of all claims a user has
    }   

    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public profileExists;


    // function createUserProfile(
    //     string memory _name,
    //     bytes[] memory _technicalSkills,
    //     bytes[] memory _softSkills,
    //     bytes[] memory _experiences,
    //     bytes[] memory _projects,
    //     bytes[] memory _achievements,
    //     bytes[] memory _endorsements,
    //     bytes[] memory _claims
    // ) public {
    //     require(!profileExists[msg.sender], "Profile already exists");
    //     userCounter++;

    //     UserProfile storage profile = userProfiles[msg.sender];
    //     profile.name = _name;
    //     profile.id = userCounter;
    //     profileExists[msg.sender] = true;

       

    //     // Assign the values to the profile
        


        

    //     // Loop over each soft skill and push onto profile
    //     for (uint256 i = 0; i < _softSkills.length; i++) {
    //         Skill memory skill = abi.decode(_softSkills[i], (Skill));
    //         profile.softSkills.push(skill);
    //     }

    //     // Loop over each experience and push onto profile
    //     for (uint256 i = 0; i < _experiences.length; i++) {
    //         Experience memory experience = abi.decode(_experiences[i], (Experience));
    //         profile.experiences.push(experience);
    //     }


    //     // Loop over each project and push onto profile
    //     for (uint256 i = 0; i < _projects.length; i++) {
    //         Project memory project = abi.decode(_projects[i], (Project));
    //         profile.projects.push(project);
    //     }


    //     // Loop over each achievement and push onto profile
    //     for (uint256 i = 0; i < _achievements.length; i++) {
    //         Achievement memory achievement = abi.decode(_achievements[i], (Achievement));
    //         profile.achievements.push(achievement);
    //     }

    //     // Loop over each endorsement and push onto profile
    //     for (uint256 i = 0; i < _endorsements.length; i++) {
    //         Endorsement memory endorsement = abi.decode(_endorsements[i], (Endorsement));
    //         profile.endorsements.push(endorsement);
    //     }


    //     // Loop over each claim and push onto profile
    //     for (uint256 i = 0; i < _claims.length; i++) {
    //         Claim memory claim = abi.decode(_claims[i], (Claim));
    //         profile.claims.push(claim);
    //     }

    // }





    function createBaseProfile(string memory _name) public {
        require(!profileExists[msg.sender], "Profile already exists");
        userCounter++;

        UserProfile storage profile = userProfiles[msg.sender];
        profile.name = _name;
        profile.id = userCounter;
        profileExists[msg.sender] = true;
    }

    function addTechnicalSkills(bytes[] memory _technicalSkills) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];

        // Loop over each technical skill and push onto profile
        for (uint256 i = 0; i < _technicalSkills.length; i++) {
            Skill memory skill = abi.decode(_technicalSkills[i], (Skill));
            profile.technicalSkills.push(skill);
        }
    }

    

    function getUserProfile(address _address) public view returns (UserProfile memory) {
        return userProfiles[_address];
    }



}