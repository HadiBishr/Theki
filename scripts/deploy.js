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


    const abiCoder = new ethers.utils.AbiCoder()
    
    // Encode the components of the struct
    const encodedTechnicalSkills = profile1.technicalSkills.map(skill => abiCoder.encode(
        ['string', 'uint256', 'bool'],
        [skill.skillName, skill.experience, skill.verified]
    ));

    const encodedSoftSkills = profile1.softSkills.map(skill => abiCoder.encode(
        ['string', 'uint256', 'bool'],
        [skill.skillName, skill.experience, skill.verified]
    ));

    const encodedExperiences = profile1.experiences.map(exp => abiCoder.encode(
        ['string', 'string', 'uint256', 'bool'],
        [exp.industry, exp.jobTitle, exp.experience, exp.verified]
    ));

    const encodedProjects = profile1.projects.map(project => abiCoder.encode(
        ['string', 'string', 'string[]', 'string[]', 'string', 'string', 'bool'],
        [project.name, project.link, project.skillsApplied, project.toolsUsed, project.role, project.description, project.verified]
    ));

    const encodedAchievements = profile1.achievements.map(achievement => abiCoder.encode(
        ['string', 'string', 'string', 'bool'],
        [achievement.content, achievement.industry, achievement.skill, achievement.verified]
    ));

    const encodedEndorsements = profile1.endorsements.map(endorsement => abiCoder.encode(
        ['string', 'string', 'string[]', 'bool'],
        [endorsement.content, endorsement.endorser, endorsement.skillsRelated, endorsement.verified]
    ));

    const encodedClaims = profile1.claims.map(claim => abiCoder.encode(
        ['string', 'bool'],
        [claim.content, claim.verified]
    ));

    // Encode the whole user profile data
    const encodedProfileData = abiCoder.encode(
        [
            'string', 
            'bytes[]', 
            'bytes[]', 
            'bytes[]', 
            'bytes[]', 
            'bytes[]', 
            'bytes[]', 
            'bytes[]'
        ],
        [
            profile1.name,
            encodedTechnicalSkills,
            encodedSoftSkills,
            encodedExperiences,
            encodedProjects,
            encodedAchievements,
            encodedEndorsements,
            encodedClaims
        ]
    );

    
    transaction = await userprofilemanager.connect(user).createUserProfile(encodedProfileData)
    await transaction.wait()

    console.log("User created")

    


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