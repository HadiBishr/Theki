// Create a job after deployment for testing purposes
// Define the job information
const basic_info = {
    job_title: "NLP Engineer",
    company_name: "Theki Corp",
    seniority: "Mid-Level",
    department: "Engineering",
    location: "Remote",
    work_schedule: "Full-time",
};

const qualifications = {
    technical_skills: [  // Updated
        { skill: "Python", experience: 3 },
        { skill: "TensorFlow", experience: 2 },
        { skill: "NLP", experience: 2 },
    ],
    soft_skills: [  // Updated
        { skill: "Teamwork", experience: 2 },
        { skill: "Communication", experience: 1 },
    ],
    experiences: [
        {
            industry: "AI",
            job_title: "Machine Learning Engineer",
            experience: 3,
        },
        {
            industry: "Software Development",
            job_title: "Data Scientist",
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
    endorsements: [
        {
            content: "Excellent SQL Skills",
            endorser: "Jane Doe",
            skills_related: ["SQL", "Data Analysis"],
            verified: true,
        },
        {
            content: 'Expert in Deep Learning',
            endorser: 'John Doe',
            skills_related: ['Deep Learning', 'Python'],
            verified: false
        }
    ],
};

const duties = {
    primary_duties: "Develop NLP models and algorithms to enhance chatbot capabilities.",
    secondary_duties: "Collaborate with data scientists and software engineers.",
    deliverables: "Monthly performance reports, NLP-based chatbot improvements.",
    tools_tech: "Python, TensorFlow, PyTorch, Jupyter Notebook",
};

const compensation = {
    salary: "$100k - $120k",
    bonus: "10% annual bonus",
    benefits: "Health insurance, Paid time off, Remote work options",
};

const company_culture = {
    job_intro_hook: "Join our innovative team to create state-of-the-art NLP solutions.",
    company_profile: "Theki Corp is a leader in AI development, specializing in NLP technologies for the next generation of applications.",
};







const job_data1 = {
    basic_info,
    qualifications,
    duties,
    compensation,
    company_culture,
    theki_score: 0, // Theki score for testing purposes initially set to 0
}







// jobData2.js

const basic_info2 = {
    job_title: "Backend Developer",
    company_name: "TechWorks",
    seniority: "Senior",
    department: "Development",
    location: "New York, NY",
    work_schedule: "Full-time",
};

const qualifications2 = {
    technical_skills: [
        { skill: "Node.js", experience: 4 },
        { skill: "SQL", experience: 5 },
        { skill: "RESTful APIs", experience: 3 },
    ],
    soft_skills: [
        { skill: "Problem Solving", experience: 4 },
        { skill: "Team Collaboration", experience: 3 },
    ],
    experiences: [
        {
            industry: "Software Development",
            job_title: "Backend Engineer",
            experience: 5,
        },
        {
            industry: "Fintech",
            job_title: "Database Administrator",
            experience: 3,
        },
    ],
    projects: [
        {
            name: "Payment Gateway Integration",
            skills_applied: ["Node.js", "RESTful APIs"],
            tools_used: ["Postman", "Express.js"],
        },
        {
            name: "Data Migration Project",
            skills_applied: ["SQL", "Database Management"],
            tools_used: ["PostgreSQL", "MySQL"],
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
    endorsements: [
        {
            content: "Excellent SQL Skills",
            endorser: "Jane Doe",
            skills_related: ["SQL", "Data Analysis"],
            verified: true,
        },
        {
            content: 'Expert in Deep Learning',
            endorser: 'John Doe',
            skills_related: ['Deep Learning', 'Python'],
            verified: false
        }
    ],
};

const duties2 = {
    primary_duties: "Develop and maintain backend services for the company's core products.",
    secondary_duties: "Collaborate with frontend developers to integrate user-facing elements.",
    deliverables: "Weekly code commits, API documentation, performance improvement updates.",
    tools_tech: "Node.js, Express.js, PostgreSQL, MySQL",
};

const compensation2 = {
    salary: "$120k - $140k",
    bonus: "15% annual bonus",
    benefits: "Health insurance, 401(k), Paid time off, Commuter benefits",
};

const company_culture2 = {
    job_intro_hook: "Join our growing team to build scalable, resilient backend services for world-class products.",
    company_profile: "TechWorks is a leading provider of tech solutions, focusing on innovative and high-quality software development.",
};

// Hardcoded job data for testing
const job_data2 = {
    basic_info2,
    qualifications2,
    duties2,
    compensation2,
    company_culture2,
    theki_score: 0, // Theki score for testing purposes initially set to 0
};


export const jobs = [job_data1]






export const profile1 = {
    name: 'Hadi',
    technical_skills: [
        { skill: 'JavaScript', experience: 2, verified: false }, // Changed from NLP to JavaScript
        { skill: 'React', experience: 1, verified: true } // Changed from Machine Learning to React
    ],
    soft_skills: [
        { skill: 'Leadership', experience: 5, verified: true },
        { skill: 'Communication', experience: 3, verified: false }
    ],
    experiences: [
        { industry: 'Web Development', job_title: 'Frontend Developer', experience: 2, verified: true }, // Changed from AI Research to Web Development
        { industry: 'Software Development', job_title: 'Junior Developer', experience: 1, verified: false } // Changed job title and experience
    ],
    projects: [
        {
            name: 'E-commerce Website',
            link: 'http://project-link.com',
            skills_applied: ['JavaScript', 'React'], // Changed skills to JavaScript and React
            tools_used: ['Node.js', 'Express'], // Changed tools to Node.js and Express
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
            skills_related: ['JavaScript', 'React'],
            verified: true
        }
    ],
    claims: [
        { content: 'Contributed to a major e-commerce project', verified: true } // Changed to reflect the new project experience
    ]
};



// export const profile1 = {
//     technical_skills: [
//         { skill: 'Natural Language Processing', experience: 3, verified: true },
//         { skill: 'Machine Learning', experience: 2, verified: false }
//     ],
//     soft_skills: [
//         { skill: 'Leadership', experience: 5, verified: true },
//         { skill: 'Communication', experience: 3, verified: false }
//     ],
//     experiences: [
//         { industry: 'AI Research', job_title: 'Research Scientist', experience: 4, verified: true },
//         { industry: 'Software Development', job_title: 'Software Engineer', experience: 3, verified: false }
//     ],
//     projects: [
//         {
//             name: 'AI Chatbot',
//             link: 'http://project-link.com',
//             skills_applied: ['Python', 'NLP'],
//             tools_used: ['TensorFlow', 'Jupyter Notebook'],
//             role: 'Lead Developer',
//             description: 'Developed an AI-powered chatbot for customer support.',
//             verified: true
//         }
//     ],
//     achievements: [
//         { content: 'Best AI Research Award', industry: 'AI', skill: 'Research', verified: true }
//     ],
//     endorsements: [
//         {
//             content: 'Expert in Deep Learning',
//             endorser: 'John Doe',
//             skills_related: ['Deep Learning', 'Python'],
//             verified: false
//         }
//     ],
//     claims: [
//         { content: 'Contributed to a high-profile AI project', verified: true }
//     ]
// };



// profile2.js

const profile2 = {
    technical_skills: [
        { skill: "Backend Development", experience: 4, verified: true },
        { skill: "SQL Databases", experience: 5, verified: true },
        { skill: "API Development", experience: 3, verified: false },
    ],
    soft_kills: [
        { skill: "Team Collaboration", experience: 4, verified: true },
        { skill: "Time Management", experience: 3, verified: true },
    ],
    experiences: [
        { industry: "Fintech", job_title: "Backend Engineer", experience: 4, verified: true },
        { industry: "Banking", job_title: "Database Administrator", experience: 5, verified: false },
    ],
    projects: [
        {
            name: "Fintech Platform Backend",
            link: "http://fintech-backend-project.com",
            skills_applied: ["SQL", "Node.js"],
            tools_used: ["MySQL", "Express.js"],
            role: "Lead Backend Developer",
            description: "Built and optimized backend architecture for a fintech platform.",
            verified: true,
        },
        {
            name: "Customer Data Migration",
            link: "http://datamigration-project.com",
            skills_applied: ["SQL", "Data Analysis"],
            tools_used: ["PostgreSQL", "Python"],
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
            skills_related: ["SQL", "Data Analysis"],
            verified: true,
        },
    ],
    claims: [
        { content: "Worked on successful backend deployment for e-commerce client", verified: true },
    ],
};




