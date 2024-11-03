// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.



const { mul } = require("@tensorflow/tfjs");
const hre = require("hardhat")


const profile1 = {
    name: 'Hadi',
    technicalSkills: [
        { skillName: 'Javascript', experience: 2, verified: false }, // Changed from NLP to JavaScript
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



// Use fallback for each profile property to make sure they're all arrays\
const technicalSkills = profile1.technicalSkills || []; // This grabs the technicalSkills from the profile variable for easier use. 
const softSkills = profile1.softSkills || [];
const experiences = profile1.experiences || [];
const projects = profile1.projects || [];
const achievements = profile1.achievements || [];
const endorsements = profile1.endorsements || [];
const claims = profile1.claims || [];

// Encode technical skills
const encodedTechnicalSkills = technicalSkills.map((skill) => {  // Loops through each technical skill
    return ethers.utils.defaultAbiCoder.encode(
        ["string", "uint256", "bool"],
        [skill.skillName, skill.experience, skill.verified]
    );
});

// Encode soft skills
const encodedSoftSkills = softSkills.map((skill) => { // Loops through each soft skill
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



async function main() {
    // Setup accounts
    const [deployer, user] = await ethers.getSigners()

    let thekitoken, userprofilemanager, jobmanager, multicall

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

    // // Deploy MultiCall contract
    // const MultiCall = await hre.ethers.getContractFactory("MultiCall", deployer)
    // multicall = await MultiCall.deploy({gasLimit: 30000000})
    // await multicall.deployed()

    // console.log(`MultiCall contract deployed ${multicall.address}\n` )


    

    // Deploy the user profile with encoded data
    async function createProfile() {
        try {

            profileManagerWithSigner = userprofilemanager.connect(user)

            const data = []

            const sections = [
                {functionName: "createBaseProfile", args: [profile1.name]},
                {functionName: "addTechnicalSkills", args: [encodedTechnicalSkills]},
                {functionName: "addSoftSkills", args: [encodedSoftSkills]},
                {functionName: "addExperiences", args: [encodedExperiences]},
                {functionName: "addProjects", args: [encodedProjects]},
                {functionName: "addAchievements", args: [encodedAchievements]},
                {functionName: "addEndorsements", args: [encodedEndorsements]},
                {functionName: "addClaims", args: [encodedClaims]}
            ]

            sections.forEach((section) => {
                data.push(userprofilemanager.interface.encodeFunctionData(section.functionName, section.args))
            })

    

            let transaction = await userprofilemanager.connect(user).multiCall(data)
            await transaction.wait()




            console.log("User profile created");
        } catch (error) {
            console.error("Error creating user profile:", error);
        }
    }

    console.log("User created")

    createProfile()

    




    
 

   


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });