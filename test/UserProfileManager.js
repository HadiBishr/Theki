const { expect } = require("chai")

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



// Use fallback for each profile property to make sure they're all arrays
const technicalSkills = profile1.technicalSkills || [];
const softSkills = profile1.softSkills || [];
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



describe("UserProfileManager", function () {
    let deployer
    let userprofilemanager


    beforeEach(async () => {
        [deployer, user] = await ethers.getSigners()

        const UserProfileManager = await ethers.getContractFactory("UserProfileManager", deployer)
        userprofilemanager = await UserProfileManager.deploy()
        await userprofilemanager.deployed()

        // Create a user.
        // Deploy the user profile with encoded data

        var transaction = await userprofilemanager.connect(user).createBaseProfile(profile1.name);
        await transaction.wait()

        console.log("User created")


        transaction = await userprofilemanager.connect(user).addTechnicalSkills(encodedTechnicalSkills)
        await transaction.wait
    })

    describe("Check Profile Details", function () {
        it("Check If Profile Exists", async () => {
           const result = await userprofilemanager.profileExists(user.address)
           expect(result).to.equal(true)
        })

        it("Check Id", async () => {
            const result = await userprofilemanager.getUserProfile(user.address)
            expect(result.id).to.equal(1)
        })

        it("Check skill", async () => {
            const result = await userprofilemanager.getUserProfile(user.address)
            technical_skills = await result.technicalSkills()
            expect(technicalSkills.length).to.be.greaterThan(0)

        })


    })

    
})