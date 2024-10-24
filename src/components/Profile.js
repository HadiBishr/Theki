import './css/Profile.css'
import {useState} from 'react';


const Profile = ({ profileData, account }) => {
    

    const [addingTechnicalSkill, setAddingTechnicalSkill] = useState(null)
    const [addingSoftSkill, setAddingSoftSkill] = useState(null)


    const [profile, setProfile] = useState({
        name: '',
        technicalSkills: [
            { skillName: '', experience: 0, verified: false }
        ],
        softSkills: [
            { skillName: '', experience: 0, verified: false }
        ],
        experiences: [
            { industry: '', jobTitle: '', experience: 0, verified: false }
        ],
        projects: [
            {
                name: '', link: '', skillsApplied: [], toolsUsed: [],
                role: '', description: '', verified: false
            }
        ],
        achievements: [
            { content: '', industry: '', skill: '', verified: false }
        ],
        endorsements: [
            { content: '', endorser: '', skillsRelated: [], verified: false }
        ],
        claims: [
            { content: '', verified: false }
        ]
    });



    // This function adds a new item to the specified section. It does not populate it, but just gets it ready if a user wants to add another skill. When the profile variable gets set, technicalSkills only has one entry. What this does is just add another entry so that it sets a user up for when they want to add another technical skill
    const handleAddItem = (section) => {
        setProfile((prevProfile) => {
            // Create a new item 
            let newItem;
            switch (section) {
                case 'technicalSkills':
                    newItem = { skillName: '', experience: 0, verified: false };
                    break;
                case 'softSkills':
                    newItem = { skillName: '', experience: 0, verified: false };
                    break;
                case 'experiences':
                    newItem = { industry: '', jobTitle: '', experience: 0, verified: false};
                    break;
                case 'projects':
                    newItem = {
                        name: '', link: '', skillsApplied: [], toolsUsed: [],
                        role: '', description: '', verified: false
                    };
                    break;
                case 'achievements':
                    newItem = { content: '', industry: '', skill: '', verified: false };
                    break;
                case 'endorsements':
                    newItem = { content: '', endorser: '', skillsRelated: [], verified: false };
                    break;
                case 'claims':
                    newItem = { content: '', verified: false };
                    break;
                default:
                    throw new Error('Unkown Section')
            }

            // Add the new item to the corresponding section in the profile
            return {
                ...prevProfile,  // This copies the existing profile
                [section]: [...prevProfile[section], newItem]    
            }
        })
    }


    // This function edits the empty entry of the section specified of the profile vaeriable. For example we can see that when profile is initialized, it onyl has one skill entry. What this does it just edit that entry with the specified user input. 
    const handleInputChange = (section, index, field, value) => {
        setProfile((prevProfile) => {
            // Make a copy of the entire section
            const updatedSection = [...prevProfile[section]]

            // Update the specific field of the specific item
            updatedSection[index] = {
                ...updatedSection[index],
                [field]: value              // This could be for example skillName: "Javascript"" 
            }

            return {
                ...prevProfile,             // prevProfile and updatedSection does not hae to be in cornological order. updatedSection could be any section and it will change it. 
                [section]: updatedSection,
            };

        })
    }


    const handleRemoveItem = (section, index) => {
        setProfile((prevProfile) => {
            const updatedSection = [...prevProfile[section]]    
            updatedSection.splice(index, 1)     // Remove the item at the specified index

            return {
                ...prevProfile,
                [section]: updatedSection
            }
        })  
    }


    // This deals with debugging. Logging how the profile looks as we go.
    const handleSubmit = () => {
        console.log(profile)
    }


    const renderProfileSection = (title, data, fields) => {
        
    }



    return (
        <div className="container">



            {profileData ? (
                <div>
                    <h2 className="profile-header">Profile Data for {profileData.name}</h2>


                    {/* Show all Technical Skills */}
                    <h3 className="profile-section-header">Technical Skills</h3>
                    {profileData.technicalSkills.length > 0 ? (
                        <ul className='profile-list'>
                            {profileData.technicalSkills.map((skill, index) => (
                                <li key={index}>
                                    <strong>Skill:</strong> {skill.skillName} <br />
                                    <strong>Experience:</strong> {skill.experience.toString()} <br />
                                    <strong>Verified:</strong> <span className={skill.verified ? 'verified-status' : 'not-verified-status'}>
                                        {skill.verified ? ('Yes') : ('No')} 
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No technical skills available</p>
                    )}



                    {/* Show all Soft Skills */}
                    <h3 className="profile-section-header">Soft Skills</h3>
                    {profileData.softSkills.length > 0 ? (
                        <ul className='profile-list'>
                            {profileData.softSkills.map((skill, index) => (
                                <li key={index}>
                                    <strong>Skill:</strong> {skill.skillName} <br />
                                    <strong>Experience:</strong> {skill.experience.toString()} <br />
                                    <strong>Verified:</strong> <span className={skill.verified ? 'verified-status' : 'not-verified-status'}> 
                                        
                                        {skill.verified ? ('Yes') : ('No')} 

                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No soft skills available</p>
                    )}



                    {/* Show all Experiences */}
                    <h3 className="profile-section-header">Experiences</h3>
                    {profileData.experiences.length > 0 ? (
                        <ul className='profile-list'>
                            {profileData.experiences.map((experience, index) => (
                                <li key={index}>
                                    <strong>Industry:</strong> {experience.industry} <br />
                                    <strong>Job Title:</strong> {experience.jobTitle} <br />
                                    <strong>Experience:</strong> {experience.experience.toString()} <br />
                                    <strong>Verified:</strong> <span className={experience.verified ? 'verified-status' : 'not-verified-status'}>
                                        {experience.verified ? ('Yes') : ('No')} 
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No experiences available</p>
                    )}




                    {/* Show all Projects */}
                    <h3 className="profile-section-header">Projects</h3>
                    {profileData.projects.length > 0 ? (
                        <ul className='profile-list'>
                            {profileData.projects.map((project, index) => (
                                <li key={index}>
                                    <strong>Name:</strong> {project.name} <br />
                                    <strong>Link:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer" className='project-link'>{project.link}</a> <br />
                                    <strong>Skills Applied:</strong> {project.skillsApplied.join(', ')} <br />
                                    <strong>Tools Used:</strong> {project.toolsUsed.join(', ')} <br />
                                    <strong>Role:</strong> {project.role} <br />
                                    <strong>Description:</strong> {project.description} <br />
                                    <strong>Verified:</strong> <span className={project.verified ? 'verified-status' : 'not-verified-status'}>
                                        {project.verified ? ('Yes') : ('No')} 
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No projects available</p>
                    )}



                    {/* Show all Achievements */}
                    <h3 className="profile-section-header">Achievements</h3>
                    {profileData.achievements.length > 0 ? (
                        <ul className='profile-list'>
                            {profileData.achievements.map((achievement, index) => (
                                <li key={index}>
                                    <strong>Content:</strong> {achievement.content} <br />
                                    <strong>Industry:</strong> {achievement.industry} <br />
                                    <strong>Skill:</strong> {achievement.skill} <br />
                                    <strong>Verified:</strong> <span className={achievement.verified ? 'verified-status' : 'not-verified-status'}>
                                        {achievement.verified ? ('Yes') : ('No')} 
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No achievements available</p>
                    )}



                    {/* Show all Endorsements */}
                    <h3 className="profile-section-header">Endorsements</h3>
                    {profileData.endorsements.length > 0 ? (
                        <ul className='profile-list'>
                            {profileData.endorsements.map((endorsement, index) => (
                                <li key={index}>
                                    <strong>Content:</strong> {endorsement.content} <br />
                                    <strong>Endorser:</strong> {endorsement.endorser} <br />
                                    <strong>Skills Related:</strong> {endorsement.skillsRelated.join(', ')} <br />
                                    <strong>Verified:</strong> <span className={endorsement.verified ? 'verified-status' : 'not-verified-status'}>
                                        {endorsement.verified ? ('Yes') : ('No')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No endorsements available</p>
                    )}


                    {/* Show all Claims */}
                    <h3 className="profile-section-header">Claims</h3>
                    {profileData.claims.length > 0 ? (
                        <ul className='profile-list'>
                            {profileData.claims.map((claim, index) => (
                                <li key={index}>
                                    <strong>Content:</strong> {claim.content} <br />
                                    <strong>Verified:</strong> <span className={claim.verified ? 'verified-status' : 'not-verified-status'}>
                                        {claim.verified ? ('Yes') : ('No')} 
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No claims available</p>
                    )}


                    

                </div>
            ) : (


                <div>

                    <h1 className='create-profile-header'>Create a new profile</h1>   


                    {/* Add Technical Skills */}

                    <h3>Add Technical Skills</h3>
                    {profile.technicalSkills.map((skill, index) => (
                        <div key={index}>

                            <input 
                            type="text"
                            placeholder="Skill Name"
                            value={skill.skillName}
                            onChange={(e) => handleInputChange('technicalSkills', index, "skillName", e.target.value) }
                            />


                            <input 
                            type="number"
                            placeholder="Experience (years)"
                            value={skill.experience}
                            onChange={(e) => handleInputChange('technicalSkills', index, "experience", e.target.value) }
                            />


                            <h4>Autoamtically set to false</h4>

                            <button onClick={() => handleRemoveItem('technicalSkills', index)} className='button-remove'>Remove Skill</button>


                        </div>

                    ))}
                    <button onClick={() => handleAddItem('technicalSkills')}>Add Technical Skill</button>

                        
                    
                    {/* Add Soft Skills */}

                    <h3>Add Soft Skills</h3>
                    {profile.softSkills.map((skill, index) => (
                        <div key={index}>

                            <input 
                            type="text"
                            placeholder="Skill Name"
                            value={skill.skillName}
                            onChange={(e) => handleInputChange('softSkills', index, "skillName", e.target.value) }
                            />


                            <input 
                            type="number"
                            placeholder="Experience (years)"
                            value={skill.experience}
                            onChange={(e) => handleInputChange('softSkills', index, "experience", e.target.value) }
                            />


                            <h4>Autoamtically set to false</h4>

                            <button onClick={() => handleRemoveItem('softSkills', index)} className='button-remove'>Remove Skill</button>


                        </div>

                    ))}
                    <button onClick={() => handleAddItem('softSkills')}>Add Soft Skill</button>
                    
                    



                    {/* Add Experiences */}

                    <h3>Add Experiences</h3>
                    {profile.experiences.map((experience, index) => (
                        <div key={index}>

                            <input 
                            type="text"
                            placeholder="Experience Name"
                            value={experience.industry}
                            onChange={(e) => handleInputChange('experiences', index, "industry", e.target.value) }
                            />


                            <input 
                            type="text"
                            placeholder="Job Title"
                            value={experience.jobTitle}
                            onChange={(e) => handleInputChange('experiences', index, "jobTitle", e.target.value) }
                            />

                             <input 
                            type="number"
                            placeholder="Experience (years)"
                            value={experience.experience}
                            onChange={(e) => handleInputChange('experiences', index, "experience", e.target.value) }
                            />


                            <h4>Autoamtically set to false</h4>

                            <button onClick={() => handleRemoveItem('experiences', index)} className='button-remove'>Remove Experience</button>


                        </div>

                    ))}
                    <button onClick={() => handleAddItem('experiences')}>Add Soft Skill</button>




                    {/* Add Experiences */}







                    {/* <button onClick={handleSubmit}>Submit and Log Profile</button> */}
                


                </div>
                

                
            )}
        </div>
    )
}

export default Profile;