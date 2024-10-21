// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.



const hre = require("hardhat")


const profile1 = {
    name: 'Hadi',
    technicalSkills: [
        { skillName: 'JavaScript', experience: 2, verified: false }, // Changed from NLP to JavaScript
        { skillName: 'React', experience: 1, verified: true } // Changed from Machine Learning to React
    ],
    softSkills: [
        { skillName: 'Leadership', experience: 5, verified: true },
        { skillName: 'Communication', experience: 3, verified: false }
    ],
    experiences: [
        { industry: 'Web Development', jobTitle: 'Frontend Developer', experience: 2, verified: true }, // Changed from AI Research to Web Development
        { industry: 'Software Development', jobTitle: 'Junior Developer', experience: 1, verified: false } // Changed job title and experience
    ],
    projects: [
        {
            name: 'E-commerce Website',
            link: 'http://project-link.com',
            skillsApplied: ['JavaScript', 'React'], // Changed skills to JavaScript and React
            toolsUsed: ['Node.js', 'Express'], // Changed tools to Node.js and Express
            role: 'Frontend Developer',
            description: 'Developed the frontend for an e-commerce platform.',
            verified: true
        }
    ],
    achievements: [
        { content: 'Top Frontend Developer Award', industry: 'Web Development', skill: 'React', verified: true } // Changed award and skill to Frontend development
    ],
    endorsements: [
        {
            content: 'Expert in JavaScript',
            endorser: 'Jane Doe',
            skillsRelated: ['JavaScript', 'React'],
            verified: true
        }
    ],
    claims: [
        { content: 'Contributed to a major e-commerce project', verified: true } // Changed to reflect the new project experience
    ]
};



async function main() {
    // Setup accounts
    const [deployer, user] = await ethers.getSigners()

    // Deploy ThekiToken contract
    const ThekiToken = await hre.ethers.getContractFactory("ThekiToken", deployer)
    thekitoken = await ThekiToken.deploy({gasLimit: 30000000})
    await thekitoken.deployed()

    console.log(`ThekiToken contract deployed ${thekitoken.address}\n`)


    // Deploy UserProfile contract
    const UserProfileManager = await hre.ethers.getContractFactory("UserProfileManager", deployer)
    userprofilemanager = await UserProfileManager.deploy({gasLimit: 30000000})
    await userprofilemanager.deployed()

    console.log(`UserProfileManager contract deployed ${userprofilemanager.address}\n`)

    // Deploy UserProfile contract
    const JobManager = await hre.ethers.getContractFactory("JobManager", deployer)
    jobmanager = await JobManager.deploy({gasLimit: 30000000})
    await jobmanager.deployed()

    console.log(`JobManager contract deployed ${jobmanager.address}\n`)


    // Use fallback for each profile property to make sure they're all arrays
    const technicalSkills = profile1.technical_skills || [];
    const softSkills = profile1.soft_skills || [];
    const experiences = profile1.experiences || [];
    const projects = profile1.projects || [];
    const achievements = profile1.achievements || [];
    const endorsements = profile1.endorsements || [];
    const claims = profile1.claims || [];

    // Encode technical skills
    const encodedTechnicalSkills = technicalSkills.map((skill) => {
        return ethers.utils.defaultAbiCoder.encode(
            ["string", "uint256", "bool"],
            [skill.skillName, skill.experience, skill.verified]
        );
    });

    // Encode soft skills
    const encodedSoftSkills = softSkills.map((skill) => {
        return ethers.utils.defaultAbiCoder.encode(
            ["string", "uint256", "bool"],
            [skill.skillName, skill.experience, skill.verified]
        );
    });

    // Encode experiences
    const encodedExperiences = experiences.map((experience) => {
        return ethers.utils.defaultAbiCoder.encode(
            ["string", "string", "uint256", "bool"],
            [experience.industry, experience.jobTitle, experience.experience, experience.verified]
        );
    });

    // Encode projects
    const encodedProjects = projects.map((project) => {
        return ethers.utils.defaultAbiCoder.encode(
            ["string", "string", "string[]", "string[]", "string", "string", "bool"],
            [
                project.name,
                project.link,
                project.skillsApplied,
                project.toolsUsed,
                project.role,
                project.description,
                project.verified
            ]
        );
    });

    // Encode achievements
    const encodedAchievements = achievements.map((achievement) => {
        return ethers.utils.defaultAbiCoder.encode(
            ["string", "string", "string", "bool"],
            [
                achievement.content,
                achievement.industry,
                achievement.skill,
                achievement.verified
            ]
        );
    });

    // Encode endorsements
    const encodedEndorsements = endorsements.map((endorsement) => {
        return ethers.utils.defaultAbiCoder.encode(
            ["string", "string", "string[]", "bool"],
            [
                endorsement.content,
                endorsement.endorser,
                endorsement.skillsRelated,
                endorsement.verified
            ]
        );
    });

    // Encode claims
    const encodedClaims = claims.map((claim) => {
        return ethers.utils.defaultAbiCoder.encode(
            ["string", "bool"],
            [
                claim.content,
                claim.verified
            ]
        );
    });

    // Deploy the user profile with encoded data
    async function createProfile() {
        try {
            const transaction = await userprofilemanager.connect(user).createUserProfile(
                profile1.name,
                encodedTechnicalSkills,
                encodedSoftSkills,
                encodedExperiences,
                encodedProjects,
                encodedAchievements,
                encodedEndorsements,
                encodedClaims
            );

            await transaction.wait();
            console.log("User profile created");
        } catch (error) {
            console.error("Error creating user profile:", error);
        }
    }

    console.log("User created")

    createProfile()

    


    // const transaction = await thekitoken.connect(deployer).createJob(
    //     jobData.basicInfo,
    //     jobData.qualifications,
    //     jobData.duties,
    //     jobData.compensation,
    //     jobData.companyCulture,
    //     jobData.thekiScore
    // )
    
    // await transaction.wait()

    // console.log("Job sucessfully created for testing purposes")




    
 

   


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });