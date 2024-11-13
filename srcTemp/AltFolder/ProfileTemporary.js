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
)}



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




  {/* {field.isBoolean ? (                                 // All the conditions here is to deal with the different types of objects that this data might have. Could be arrays, or ints which have to be converted to a string. Also displaying something verified.  
                                            <span className={item[field.key] ? 'verified-status' : 'not-verified-status'}> 
                                                {item[field.key] ? ('Yes') : (
                                                    <>
                                                        No
                                                        < Link 
                                                            to="/emailform"
                                                            state={{ title: title }}    
                                                        >
                                                            <button >Verify</button>
                                                        </Link>
                                                    </>
                                                   
                                                    
                                                )} 

                                                
                                            </span>

                                            


                                        ) : (

                                            
                                            
                                            
                                            // } 
                                            // }

                                            Array.isArray(item[field.key])  // This checks if the specific field is an array since we have many arrays. 
                                                ? item[field.key].join(', ') // This exeutes if array is true 
                                                : typeof item[field.key] === 'object' && item[field.key]._isBigNumber  // If false execute another if statement
                                                    ? item[field.key].toString()
                                                    : field.isLink 
                                                        ? <a href={item[field.key]} target="_blank" rel="noopener noreferrer" className='project-link'>{item[field.key]}</a> 
                                                        : item[field.key]
                                        )} */}