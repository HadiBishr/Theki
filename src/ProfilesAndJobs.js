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
    technical_skills: [  // Updated
        { skillName: "Python", experience: 3 },
        { skillName: "TensorFlow", experience: 2 },
        { skillName: "NLP", experience: 2 },
    ],
    soft_skills: [  // Updated
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
            skills_applied: ["NLP", "Machine Learning"],  // Updated
            tools_used: ["TensorFlow", "Python"],  // Updated
        },
        {
            name: "Sentiment Analysis",
            skills_applied: ["Text Mining", "NLP"],  // Updated
            tools_used: ["PyTorch", "Jupyter Notebook"],  // Updated
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







const jobData1 = {
    basicInfo,
    qualifications,
    duties,
    compensation,
    companyCulture,
    thekiScore: 0, // Theki score for testing purposes initially set to 0
}







// jobData2.js

const basicInfo2 = {
    jobTitle: "Backend Developer",
    companyName: "TechWorks",
    seniority: "Senior",
    department: "Development",
    location: "New York, NY",
    workSchedule: "Full-time",
};

const qualifications2 = {
    technicalSkills: [
        { skillName: "Node.js", experience: 4 },
        { skillName: "SQL", experience: 5 },
        { skillName: "RESTful APIs", experience: 3 },
    ],
    softSkills: [
        { skillName: "Problem Solving", experience: 4 },
        { skillName: "Team Collaboration", experience: 3 },
    ],
    experiences: [
        {
            industry: "Software Development",
            jobTitle: "Backend Engineer",
            experience: 5,
        },
        {
            industry: "Fintech",
            jobTitle: "Database Administrator",
            experience: 3,
        },
    ],
    projects: [
        {
            name: "Payment Gateway Integration",
            skillsApplied: ["Node.js", "RESTful APIs"],
            toolsUsed: ["Postman", "Express.js"],
        },
        {
            name: "Data Migration Project",
            skillsApplied: ["SQL", "Database Management"],
            toolsUsed: ["PostgreSQL", "MySQL"],
        },
    ],
    achievements: [
        {
            content: "Top Performer of the Year 2022",
            industry: "Software Development",
            skill: "Backend Development",
        },
        {
            content: "Certified Database Administrator",
            industry: "Fintech",
            skill: "SQL",
        },
        {
            content: "Patent on Data Optimization Algorithm",
            industry: "Data Science",
            skill: "Optimization Techniques",
        },
    ],
    endorsements: 8,
};

const duties2 = {
    primaryDuties: "Develop and maintain backend services for the company's core products.",
    secondaryDuties: "Collaborate with frontend developers to integrate user-facing elements.",
    deliverables: "Weekly code commits, API documentation, performance improvement updates.",
    toolsTech: "Node.js, Express.js, PostgreSQL, MySQL",
};

const compensation2 = {
    salary: "$120k - $140k",
    bonus: "15% annual bonus",
    benefits: "Health insurance, 401(k), Paid time off, Commuter benefits",
};

const companyCulture2 = {
    jobIntroHook: "Join our growing team to build scalable, resilient backend services for world-class products.",
    companyProfile: "TechWorks is a leading provider of tech solutions, focusing on innovative and high-quality software development.",
};

// Hardcoded job data for testing
const jobData2 = {
    basicInfo: basicInfo2,
    qualifications: qualifications2,
    duties: duties2,
    compensation: compensation2,
    companyCulture: companyCulture2,
    thekiScore: 0, // Theki score for testing purposes initially set to 0
};


export const jobs = [jobData1, jobData2]










export const profile1 = {
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



// profile2.js

const profile2 = {
    technicalSkills: [
        { skillName: "Backend Development", experience: 4, verified: true },
        { skillName: "SQL Databases", experience: 5, verified: true },
        { skillName: "API Development", experience: 3, verified: false },
    ],
    softSkills: [
        { skillName: "Team Collaboration", experience: 4, verified: true },
        { skillName: "Time Management", experience: 3, verified: true },
    ],
    experiences: [
        { industry: "Fintech", jobTitle: "Backend Engineer", experience: 4, verified: true },
        { industry: "Banking", jobTitle: "Database Administrator", experience: 5, verified: false },
    ],
    projects: [
        {
            name: "Fintech Platform Backend",
            link: "http://fintech-backend-project.com",
            skillsApplied: ["SQL", "Node.js"],
            toolsUsed: ["MySQL", "Express.js"],
            role: "Lead Backend Developer",
            description: "Built and optimized backend architecture for a fintech platform.",
            verified: true,
        },
        {
            name: "Customer Data Migration",
            link: "http://datamigration-project.com",
            skillsApplied: ["SQL", "Data Analysis"],
            toolsUsed: ["PostgreSQL", "Python"],
            role: "Database Specialist",
            description: "Led a successful data migration project to a new database system.",
            verified: false,
        },
    ],
    achievements: [
        { content: "Certified MySQL Developer", industry: "Data Management", skill: "SQL", verified: true },
        { content: "Best Data Migration Project Award", industry: "Fintech", skill: "Data Management", verified: true },
    ],
    endorsements: [
        {
            content: "Excellent SQL Skills",
            endorser: "Jane Doe",
            skillsRelated: ["SQL", "Data Analysis"],
            verified: true,
        },
    ],
    claims: [
        { content: "Worked on successful backend deployment for e-commerce client", verified: true },
    ],
};




