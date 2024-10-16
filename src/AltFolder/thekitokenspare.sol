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






    // The struct below is for user profile






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
        Skill[] technicalSkills;        // A list of all technical skills a user has
        Skill[] softSkills;             // A list of all soft skills a user has
        Experience[] experiences;       // A list of all experiences a user has
        Project[] projects;             // A list of all projects a user has
        Achievement[] achievements;       // A list of all achievements a user has
        Endorsement[] endorsements;     // A list of all endorsements a user has
        Claim[] claims;                 // A list of all claims a user has
    }   





    
    mapping(uint256 => Claim) public claims;                        // Stores the details of the claim. User has to input their ID of the claim they have made. 
    mapping(address => uint256[]) public professionalClaims;        // Stores the ID of the claim each address has made
    mapping(uint256 => Job) public jobs;                            // Mapping from job Id to Job struct. This is where you store all jobs made
    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public profileExists;
    // mapping(address => uint256) public userId;

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


    function createUserProfile(
        Skill[] memory _technicalSkills,
        Skill[] memory _softSkills,
        Experience[] memory _experiences,
        Project[] memory _projects,
        Achievement[] memory _achievements,
        Endorsement[] memory _endorsements,
        Claim[] memory _claims
    ) public {
        require(!profileExists[msg.sender], "Profile already exists");
        userCounter++;

        UserProfile storage profile = userProfiles[msg.sender];
        profileExists[msg.sender] = true;


        // Loop over each technical skill and push onto profile
        for (uint256 i = 0; i < _technicalSkills.length; i++) {
            profile.technicalSkills.push(_technicalSkills[i]);
        }

        // Loop over each soft skill and push onto profile
        for (uint256 i = 0; i < _softSkills.length; i++) {
            profile.softSkills.push(_softSkills[i]);
        }

        // Loop over each experience and push onto profile
        for (uint256 i = 0; i < _experiences.length; i++) {
            profile.experiences.push(_experiences[i]);
        }


        // Loop over each project and push onto profile
        for (uint256 i = 0; i < _projects.length; i++) {
            profile.projects.push(_projects[i]);
        }


        // Loop over each achievement and push onto profile
        for (uint256 i = 0; i < _achievements.length; i++) {
            profile.achievements.push(_achievements[i]);
        }

        // Loop over each endorsement and push onto profile
        for (uint256 i = 0; i < _endorsements.length; i++) {
            profile.endorsements.push(_endorsements[i]);
        }


        // Loop over each claim and push onto profile
        for (uint256 i = 0; i < _claims.length; i++) {
            profile.claims.push(_claims[i]);
        }

    }

    // Getter function to get all Job IDs
    function getAllJobIds() public view returns (uint256[] memory) {
        return jobIds;
    }

    // Getter function go get a specific job
    function getJob(uint256 jobId) public view returns (Job memory) {
        return jobs[jobId];
    }

    function getUserProfile() public view returns (UserProfile memory) {
        return userProfiles[msg.sender];
    }

  
}
