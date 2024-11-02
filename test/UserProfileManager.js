const { expect } = require("chai")

const profile1 = {
    name: 'Hadi',
    technicalSkills: [
        { skillName: 'Python', experience: 2, verified: false }, // Changed from NLP to JavaScript
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



describe("UserProfileManager", function () {
    let deployer
    let userprofilemanager, multicall
    let userprofile


    beforeEach(async () => {
        [deployer, user] = await ethers.getSigners()

        const UserProfileManager = await ethers.getContractFactory("UserProfileManager", deployer)
        userprofilemanager = await UserProfileManager.deploy()
        await userprofilemanager.deployed()

        const MultiCall = await ethers.getContractFactory("MultiCall", deployer)
        multicall = await MultiCall.deploy()
        await multicall.deployed()


        data = []


        // Loop through different sections and push encoded function calls to target
        sections = [
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
            try {
                data.push(userprofilemanager.interface.encodeFunctionData(section.functionName, section.args))
            } catch (error) {
                console.error(`Encoding failed for ${section.functionName}: `, error)
            }
            
        })
        

        try {
            let transaction = await userprofilemanager.connect(user).multiCall(data)
            await transaction.wait()

            console.log('transaction successfull')
        } catch (error) {
            console.error("transaction failed:", error)
        }
        

        // Create a user.
        // Deploy the user profile with encoded data

        // var transaction = await userprofilemanager.connect(user).createBaseProfile(profile1.name);
        // await transaction.wait()


        // console.log("User created")


        // transaction = await userprofilemanager.connect(user).addTechnicalSkills(encodedTechnicalSkills)
        // await transaction.wait()

        // transaction = await userprofilemanager.connect(user).addSoftSkills(encodedSoftSkills)
        // await transaction.wait()

        // transaction = await userprofilemanager.connect(user).addExperiences(encodedExperiences)
        // await transaction.wait()

        // transaction = await userprofilemanager.connect(user).addProjects(encodedProjects)
        // await transaction.wait()

        // transaction = await userprofilemanager.connect(user).addAchievements(encodedAchievements)
        // await transaction.wait()

        // transaction = await userprofilemanager.connect(user).addEndorsements(encodedEndorsements)
        // await transaction.wait()

        // transaction = await userprofilemanager.connect(user).addClaims(encodedClaims)
        // await transaction.wait()
    })

    describe("Check Profile Details", function () {

        beforeEach(async () => {
            userprofile = await userprofilemanager.getUserProfile(user.address)
        })


        it("Check If Profile Exists", async () => {
           const result = await userprofilemanager.profileExists(user.address)
           expect(result).to.equal(true)
        })

        it("Check Id", async () => {
            expect(userprofile.id).to.equal(1)
        })

        it("Check Name", async () => {
            expect(userprofile.name).to.equal('Hadi')
        })

        it("Check Technical Skill", async () => {
            const all_technical_skills = await userprofile.technicalSkills
            const technical_skill = await userprofile.technicalSkills[0]

            expect(technical_skill.skillName).to.equal('Python')
            expect(all_technical_skills.length).to.equal(2) // This is equal to 2 becuse we have two technical skills as shown in the profile variable

        })

        it("Check Soft Skill", async () => {
            const all_soft_skills = await userprofile.softSkills
            const soft_skill = await userprofile.softSkills[0]

            
            expect(soft_skill.skillName).to.equal('Leadership') // We could do many more tests. This is just one. 
            expect(all_soft_skills.length).to.equal(2)

        })

        it("Check Experience", async () => {
            const experiences = await userprofile.experiences
            expect(experiences.length).to.equal(2)
        })

        it("Check Projects", async () => {
            const projects = await userprofile.projects
            expect(projects.length).to.equal(1)
        })

        it("Check Achievements", async () => {
            const all_achievements = await userprofile.achievements
            const achievement = await userprofile.achievements[0]

            expect(achievement.content).to.equal('Top Frontend Developer Award')
            expect(all_achievements.length).to.equal(1)
        })



        it("Check Endorsements", async () => {
            const all_endorsements = await userprofile.endorsements
            const endorsement = await userprofile.endorsements[0]

            expect(endorsement.content).to.equal('Expert in JavaScript')
            expect(all_endorsements.length).to.equal(1)
        })
 

        it("Check Claims", async () => {
            const all_claims = await userprofile.claims
            const claim = await userprofile.claims[0]

            expect(claim.content).to.equal('Contributed to a major e-commerce project')
            expect(all_claims.length).to.equal(1)
        })


    })

    
})