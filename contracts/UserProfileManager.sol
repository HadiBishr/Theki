// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract UserProfileManager {

    uint256 public userCounter;
    uint256 public claimCounter = 0;

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






    function createBaseProfile(string memory _name) public {
        require(!profileExists[msg.sender], "Profile already exists");
        userCounter++;

        UserProfile storage profile = userProfiles[msg.sender];
        profile.name = _name;
        profile.id = userCounter;
        profileExists[msg.sender] = true;
    }


    /*

    Here is the general structure for each of the below functions to add to the user profile:

        1. You have a singular function to add whatever (For example a function to add Technical Skills). Understand that multiple of that information can be inputted into the function in the form of encoded data (For example multiple technical skills)
        2. The loop loops through each encoded data and pushes it onto where it should be. (For example loops through each technical skill and executes whatever is in it.)
        3. In the loop, it first decodes it and sets seperate variables to whatever information it is. 
        4. Then we add that decoded information into a struct where the contract can understand. 
        5. Lastly it pushes that struct into where it is supposed to go. 

    */



    // Function to add Technical Skills
    function addTechnicalSkills(bytes[] memory _encodedTechnicalSkills) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];

        // Loop over each technical skill and push onto profile
        for (uint256 i = 0; i < _encodedTechnicalSkills.length; i++) {
            (string memory _skillName, uint256 _experience, bool _verified) = abi.decode( 
                _encodedTechnicalSkills[i],
                (string, uint256, bool)
            );


            Skill memory skill = Skill(_skillName, _experience, _verified);  
            profile.technicalSkills.push(skill);  
        }
    }




    // Function to add Soft Skills
    function addSoftSkills(bytes[] memory _encodedSoftSkills) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];

        // Loop over each technical skill and push into blochchain.
        for (uint256 i = 0; i < _encodedSoftSkills.length; i++) {
            (string memory _skillName, uint256 _experience, bool _verified) = abi.decode(
                _encodedSoftSkills[i],
                (string, uint256, bool)
            );


            Skill memory skill = Skill(_skillName, _experience, _verified);
            profile.softSkills.push(skill);
        }
    }



    // Function to add Experiences
    function addExperiences(bytes[] memory _encodedExperiences) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];


        // Loop over each experience user has and push into blochchain.
        for (uint256 i = 0; i < _encodedExperiences.length; i++) {
            (string memory _industry, string memory _jobTitle, uint256 _experience, bool _verified) = abi.decode(
                _encodedExperiences[i],
                (string, string, uint256, bool)
            );

            Experience memory experience = Experience(_industry, _jobTitle, _experience, _verified);
            profile.experiences.push(experience);
        }
    }


    // Function to add Projects
    function addProjects(bytes[] memory _encodedProjects) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];
 

        // Loop over each project user has and push into blochchain.
        for (uint256 i = 0; i < _encodedProjects.length; i++) {
            (string memory _name, string memory _link, string[] memory _skillsApplied, string[] memory _toolsUsed, string memory _role, string memory _description, bool _verified) = abi.decode(
                _encodedProjects[i],
                (string, string, string[], string[], string, string, bool)
            );

            Project memory project = Project(_name, _link, _skillsApplied, _toolsUsed, _role, _description, _verified);
            profile.projects.push(project);
        }
    }


    function addAchievements(bytes[] memory _encodedAchievements) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];

        // Loop over each achievements user has and push into blockchain
        for (uint256 i = 0; i < _encodedAchievements.length; i++) {
            (string memory _content, string memory _industry, string memory _skillsRelated, bool _verified) = abi.decode(
                _encodedAchievements[i],
                (string, string, string, bool)
            );

            Achievement memory achievement = Achievement(_content, _industry, _skillsRelated, _verified);
            profile.achievements.push(achievement);
        }
    }


    function addEndorsements(bytes[] memory _encodedEndorsements) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];

        // Loop over each endorsements user has and push into blockchain
        for (uint256 i = 0; i < _encodedEndorsements.length; i++) {
            (string memory _content, string memory _endorser, string[] memory _skillsRelated, bool _verified) = abi.decode(
                _encodedEndorsements[i],
                (string, string, string[], bool)
            );

            Endorsement memory endorsement = Endorsement(_content, _endorser, _skillsRelated, _verified);
            profile.endorsements.push(endorsement);
        }
    }


    function addClaims(bytes[] memory _encodedClaims) public {
        require(profileExists[msg.sender], "Profile does not exist");
        UserProfile storage profile = userProfiles[msg.sender];
        claimCounter++;

        // Loop over each endorsements user has and push into blockchain
        for (uint256 i = 0; i < _encodedClaims.length; i++) {
            (string memory _content, bool _verified) = abi.decode(
                _encodedClaims[i],
                (string, bool)
            );

            Claim memory claim = Claim(claimCounter, msg.sender, _content, _verified);
            profile.claims.push(claim);
        }
    }




    

    function getUserProfile(address _address) public view returns (UserProfile memory) {
        return userProfiles[_address];
    }



}