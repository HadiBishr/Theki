// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")



async function main() {
    // Setup accounts
    const [deployer] = await ethers.getSigners()

    // Deploy ThekiToken contract
    const ThekiToken = await hre.ethers.getContractFactory("ThekiToken", deployer)
    thekitoken = await ThekiToken.deploy()
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
        technicalSkills: ["Python", "TensorFlow", "NLP"],
        techSkillExp: [3, 2, 2],
        softSkills: ["Teamwork", "Communication"],
        softSkillExp: [2, 1],
        industryExp: ["AI", "Software Development"],
        industryExpDur: [3, 4],
        jobExp: ["Machine Learning Engineer", "Data Scientist"],
        jobExpDur: [2, 3],
        projects: ["Chatbot Project", "Sentiment Analysis"],
        awards: ["Best Employee 2023"],
        certifications: ["Certified TensorFlow Developer"],
        patents: ["Patent on NLP Algorithm"],
        publications: ["Paper on NLP Techniques"],
        securityClearances: ["Confidential"],
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



    const transaction = await thekitoken.connect(deployer).createJob(basicInfo, qualifications, duties, compensation, companyCulture)
    await transaction.wait()

    console.log("Job sucessfully created for testing purposes")


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });