{/* Show all Technical Skills */ }
<h3 className="profile-section-header">Technical Skills</h3>
{
    profileData.technicalSkills.length > 0 ? (
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
)
}



{/* Show all Soft Skills */ }
<h3 className="profile-section-header">Soft Skills</h3>
{
    profileData.softSkills.length > 0 ? (
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
)
}



{/* Show all Experiences */ }
<h3 className="profile-section-header">Experiences</h3>
{
    profileData.experiences.length > 0 ? (
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
)
}
