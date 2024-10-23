import './css/Profile.css'
import {useState} from 'react';


const Profile = ({ profileData }) => {


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

                    
                    <h3>Add Technical Skills</h3>
                    
                    
                    



                </div>
                

                
            )}
        </div>
    )
}

export default Profile;