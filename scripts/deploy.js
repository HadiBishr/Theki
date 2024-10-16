// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")



async function main() {
    // Setup accounts
    const [deployer, user] = await ethers.getSigners()

    // Deploy ThekiToken contract
    const ThekiToken = await hre.ethers.getContractFactory("ThekiToken", deployer)
    thekitoken = await ThekiToken.deploy({gasLimit: 30000000})
    await thekitoken.deployed()

    console.log(`ThekiToken contract deployed ${thekitoken.address}\n`)



    // Create a job after deployment for testing purposes
    // Define the job information
    const basicInfo = {
        jobTitle: "NLP Engineer",
        companyName: "Theki Corp",
        seniority: "Mid-Level",
        department: "Engineering",
        location: "Remote",
        workSchedule: "Full-time",
    };

    const qualifications = {

        technicalSkills: [
            {skillName:"Python", experience: 3}, 
            {skillName:"TensorFlow", experience: 2}, 
            {skillName:"NLP", experience: 2},
        ],
        softSkills: [
            { skillName: "Teamwork", experience: 2 },
            { skillName: "Communication", experience: 1 },
        ],
        experiences: [
            {
                industry: "AI",
                jobTitle: "Machine Learning Engineer",
                experience: 3,
            },
            {
                industry: "Software Development",
                jobTitle: "Data Scientist",
                experience: 4,
            },
        ],
        projects: [
            {
                name: "Chatbot Project",
                skillsApplied: ["NLP", "Machine Learning"],
                toolsUsed: ["TensorFlow", "Python"],
            },
            {
                name: "Sentiment Analysis",
                skillsApplied: ["Text Mining", "NLP"],
                toolsUsed: ["PyTorch", "Jupyter Notebook"],
            },
        ],
        achievements: [
            {
                content: "Best Employee 2023",
                industry: "AI",
                skill: "Teamwork",
            },
            {
                content: "Certified TensorFlow Developer",
                industry: "Software Development",
                skill: "TensorFlow",
            },
            {
                content: "Patent on NLP Algorithm",
                industry: "AI",
                skill: "NLP",
            },
            {
                content: "Paper on NLP Techniques",
                industry: "AI",
                skill: "NLP",
            },
            {
                content: "Confidential",
                industry: "Security",
                skill: "Security Clearance",
            },
        ],
        endorsements: 5,

    };

    const duties = {
        primaryDuties: "Develop NLP models and algorithms to enhance chatbot capabilities.",
        secondaryDuties: "Collaborate with data scientists and software engineers.",
        deliverables: "Monthly performance reports, NLP-based chatbot improvements.",
        toolsTech: "Python, TensorFlow, PyTorch, Jupyter Notebook",
    };

    const compensation = {
        salary: "$100k - $120k",
        bonus: "10% annual bonus",
        benefits: "Health insurance, Paid time off, Remote work options",
    };

    const companyCulture = {
        jobIntroHook: "Join our innovative team to create state-of-the-art NLP solutions.",
        companyProfile: "Theki Corp is a leader in AI development, specializing in NLP technologies for the next generation of applications.",
    };

    const jobData = {
        basicInfo,
        qualifications,
        duties,
        compensation,
        companyCulture,
        thekiScore: 0, // Theki score for testing purposes initially set to 0
    }



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




    const profile = {
        technicalSkills: [
            { skillName: 'Natural Language Processing', experience: 3, verified: true },
            { skillName: 'Machine Learning', experience: 2, verified: false }
        ],
        softSkills: [
            { skillName: 'Leadership', experience: 5, verified: true },
            { skillName: 'Communication', experience: 3, verified: false }
        ],
        experiences: [
            { industry: 'AI Research', jobTitle: 'Research Scientist', experience: 4, verified: true },
            { industry: 'Software Development', jobTitle: 'Software Engineer', experience: 3, verified: false }
        ],
        projects: [
            {
                name: 'AI Chatbot',
                link: 'http://project-link.com',
                skillsApplied: ['Python', 'NLP'],
                toolsUsed: ['TensorFlow', 'Jupyter Notebook'],
                role: 'Lead Developer',
                description: 'Developed an AI-powered chatbot for customer support.',
                verified: true
            }
        ],
        achievements: [
            { content: 'Best AI Research Award', industry: 'AI', skill: 'Research', verified: true }
        ],
        endorsements: [
            {
                content: 'Expert in Deep Learning',
                endorser: 'John Doe',
                skillsRelated: ['Deep Learning', 'Python'],
                verified: false
            }
        ],
        claims: [
            { content: 'Contributed to a high-profile AI project', verified: true }
        ]
    };

    // transaction = await thekitoken.connect(user).createUserProfile(
    //     profile.technicalSkills, 
    //     profile.softSkills, 
    //     profile.experiences, 
    //     profile.projects, 
    //     profile.achievements, 
    //     profile.endorsements, 
    //     profile.claims
    // )

    // await transaction.wait()

    // console.log("User created")


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });