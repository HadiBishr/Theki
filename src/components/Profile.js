import './css/Profile.css'
import {useState} from 'react';
import { ethers } from 'ethers';

import '../index.css'

const Profile = ({ profileData, account, signer, profileManagerContract, network }) => {


    const [addingTechnicalSkill, setAddingTechnicalSkill] = useState(null)
    const [addingSoftSkill, setAddingSoftSkill] = useState(null)


    const [profile, setProfile] = useState({
        name: 'Hadi',
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

    const profileSections = {
        technicalSkills: ["string", "uint256", "bool"],
        softSkills: ["string", "uint256", "bool"],
        experiences: ["string", "string", "uint256", "bool"],
        projects: ["string", "string", "string[]", "string[]", "string", "string", "bool"],
        achievements: ["string", "string", "string", "bool"],
        endorsements: ["string", "string", "string[]", "bool"],
        claims: ["string", "bool"]
    }



    // Encode achievements
    const encodedAchievements = profile.achievements.map((achievement) => {
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

    // const encodedSection = (schema, data, schemaOrder) => {
    //     return data.map((item) => 
    //         ethers.utils.defaultAbiCoder.encode(schema, Object.values(item))
    //     )
    // }

    
    // Generalized encoding function for any section of the profile
    const encodedSection = (schema, data) => {
        return data.map((item) => 
            ethers.utils.defaultAbiCoder.encode(schema, Object.values(item))
        );
    };



    const encodeAllProfileSections = (profile) => {

        let encodedData = {}

        for (const section in profileSections) {
            const schema = profileSections[section]
            const data = profile[section]


            encodedData[section] = encodedSection(schema, data)
        }

        return encodedData
    }


    // This function adds a new item to the specified section. It does not populate it, but just gets it ready if a user wants to add another skill. When the profile variable gets set, technicalSkills only has one entry. What this does is just add another entry so that it sets a user up for when they want to add another technical skill
    const handleAddItem = (section, field = null, index = null) => {
        setProfile((prevProfile) => {
            let updatedSection

        

            // if (field && index !== null) {
            //     // Add to an existing array within an object (like skillsApplied)
            //     updatedSection[index][field] = [...updatedSection[index][field], '']
            // }

            updatedSection = [...prevProfile[section]]

            if (field) {
                const updatedItem = {
                    ...prevProfile[section][index],
                    [field]: [...prevProfile[section][index][field], ''] // Add one new item to the array
                }

                updatedSection = [...prevProfile[section]]
                updatedSection[index] = updatedItem;
            } else {
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
                updatedSection.push(newItem)
            }
            

            // Add the new item to the corresponding section in the profile
            return {
                ...prevProfile,  // This copies the existing profile
                [section]: updatedSection
            }
        })
    }


    // This function edits the empty entry of the section specified of the profile vaeriable. For example we can see that when profile is initialized, it only has one skill entry. What this does it just edit that entry with the specified user input. 
    const handleInputChange = (section, index, field, fieldIndex = null, value) => {
        setProfile((prevProfile) => {

            console.log("Section:", section, "Index:", index, "Field:", field, "FieldIndex:", fieldIndex, "Value:", value);

            // Make a copy of the entire section
            const updatedSection = [...prevProfile[section]] // This is a single section. For example "Technical Skills"

            if (fieldIndex !== null && Array.isArray(updatedSection[index][field])) {
                // Create a copy of the array within the specific object updating it
                const updatedArray = [...updatedSection[index][field]]
                updatedArray[fieldIndex] = value;                   // This taps into the specific index of that array and appens it to this new value
                updatedSection[index] = { 
                    ...updatedSection[index],
                    [field]: updatedArray,                           // This sets the field to that newly edited array. This field could be something like skillsApplied. 
                }
            } else {
                // Update the specific field of the specific item
                updatedSection[index] = {
                    ...updatedSection[index],
                    [field]: value,
                }
            }
            

            return {
                ...prevProfile,             // prevProfile and updatedSection does not hae to be in cornological order. updatedSection could be any section and it will change it. 
                [section]: updatedSection,
            };

        })
    }


    const handleRemoveItem = (section, field, fieldIndex, index) => {
        setProfile((prevProfile) => {

            const updatedSection = [...prevProfile[section]] 

            if (field) {
                updatedSection[index][field].splice(fieldIndex, 1)
            } else {
                updatedSection.splice(index, 1)     // Remove the item at the specified index
            }
            

            return {
                ...prevProfile,
                [section]: updatedSection
            }
        })  
    }




    // This deals with debugging. Logging how the profile looks as we go.
    async function handleSubmit() {
        console.log(signer)
        console.log("Here is the contract AGAIN:", profileManagerContract)
        console.log(profile)

        const encodedProfile = encodeAllProfileSections(profile)

        const profileContract = profileManagerContract.connect(signer)

        const data = []
        
        const sections = [
            {functionName: "createBaseProfile", args: [profile.name]},
            {functionName: "addTechnicalSkills", args: [encodedProfile.technicalSkills]},
            {functionName: "addSoftSkills", args: [encodedProfile.softSkills]},
            {functionName: "addExperiences", args: [encodedProfile.experiences]},
            {functionName: "addProjects", args: [encodedProfile.projects]},
            {functionName: "addAchievements", args: [encodedProfile.achievements]},
            {functionName: "addEndorsements", args: [encodedProfile.endorsements]},
            {functionName: "addClaims", args: [encodedProfile.claims]}
        ]

        sections.forEach((section) => {
            data.push(profileManagerContract.interface.encodeFunctionData(section.functionName, section.args))
        })

        var transaction = await profileManagerContract.connect(signer).multiCall(data)
        await transaction.wait()

        // var transaction = await profileContract.createBaseProfile(profile.name)
        // await transaction.wait()

        // transaction = await profileContract.addTechnicalSkills(encodedProfile.technicalSkills)
        // await transaction.wait()

        // transaction = await profileContract.addSoftSkills(encodedProfile.softSkills)
        // await transaction.wait()

        // transaction = await profileContract.addExperiences(encodedProfile.experiences)
        // await transaction.wait()

        // transaction = await profileContract.addProjects(encodedProfile.projects)
        // await transaction.wait()

        // transaction = await profileContract.addAchievements(encodedProfile.achievements)
        // await transaction.wait()

        // transaction = await profileContract.addEndorsements(encodedProfile.endorsements)
        // await transaction.wait()

        // transaction = await profileContract.addClaims(encodedProfile.claims)
        // await transaction.wait()


        // Refresh the page to show updated profile data
        window.localStorage.clear();
        window.location.reload();
        
    }

    // async function resetBlockchain() {
    //     console.log("Does this exist", network.provider)
    //     await network.provider.send("hardhat_reset");
    // }


    // data is the data itself from the blockchain.
    // fields is the fields that will be filled since the fields are dynamic. Meaning that when we list the profile, not all the sections will have the same fields. 

    const renderProfileSection = (title, data, fields) => {
        return (
            <div>

                <h3 className="profile-section-header">{title}</h3>
                {data.length > 0 ? (
                    <ul className='profile-list'>
                        {data.map((item, index) => (

                            <li key={index}>

                                {fields.map((field, fieldIndex) => (
                                    <div key={fieldIndex}>
                                        <strong>{field.label}</strong> {field.isBoolean ? (                                 // All the conditions here is to deal with the different types of objects that this data might have. Could be arrays, or ints which have to be converted to a string. Also displaying something verified.  
                                            <span className={item[field.key] ? 'verified-status' : 'not-verified-status'}> 
                                                {item[field.key] ? ('Yes') : ('No')} 
                                            </span>
                                        ) : (
                                            Array.isArray(item[field.key])  // This checks if the specific field is an array since we have many arrays. 
                                                ? item[field.key].join(', ') // This exeutes if array is true 
                                                : typeof item[field.key] === 'object' && item[field.key]._isBigNumber  // If false execute another if statement
                                                    ? item[field.key].toString()
                                                    : field.isLink 
                                                        ? <a href={item[field.key]} target="_blank" rel="noopener noreferrer" className='project-link'>{item[field.key]}</a> 
                                                        : item[field.key]
                                        )}
                                        <br />
                                    </div>
                                ))} 

                            </li>

                        ))}
                        
                        
                    </ul>
                ) : (
                    <p>No {title.toLowerCase()} available</p>
                )}


            </div>
        )
    }



    const renderProfileCreation = (section, title, data, fields) => {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add {title}</h3>

                {data.map((item, index) => ( 
                    <div key={index}>
                        {fields.map((field, fieldIndex) => { 
                            if (field.isArray) {            // custom logic if we are inputting values into an array
                                return (
                                    <div key={fieldIndex}>
                                        <label className="profile-input-label">{field.label}</label>
                                        {item[field.key].length > 0 ? (
                                            <ul key={field.key}>
                                                {item[field.key].map((value, valueIndex) => ( // Loop over each item in the array
                                                    <li key={valueIndex}>           
                                                        <input 
                                                            type={field.type}
                                                            className="profile-input"
                                                            value={value}
                                                            onChange={(e) => handleInputChange(section, index, field.key, valueIndex, e.target.value)}
                                                        />


                                                        <button onClick={() => handleRemoveItem(section, field.key, valueIndex, index)} className='button-remove'>
                                                            Remove Entry
                                                        </button>

                                                    
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No {field.label} added yet. </p>
                                        )}

                                        <button onClick={() => handleAddItem(section, field.key, index)} className='button-add'>
                                            Add {field.label}
                                        </button>
                
                                        
                                    </div>

                                )
                            } else {
                                return (
                                    <div key={fieldIndex}>
                                        <label className="profile-input-label">{field.label}</label>
                                        <input
                                            className="profile-input"
                                            type={field.type}
                                            placeholder={field.label}
                                            value={item[field.key]}
                                            onChange={(e) => handleInputChange(section, index, field.key, null, e.target.value)}
                                        />
                                    </div>
                                    
                                )
                                
                            }
                           
                        })}
                        
                        <button onClick={() => handleRemoveItem(section, null, null, index)} className='button-remove'>
                            Remove {title.substring(0, title.length - 1)}
                        </button>

                    </div>
                ))}

                <button onClick={() => handleAddItem(section)} className='button-add'>Add {title.substring(0, title.length - 1)}</button>

            </div>
        )
    }




    return (
        <div className="container">


            
            



            {profileData ? (


                <div>


                    <h2 className="profile-header">Profile Data for {profileData.name}</h2>

                    {/* Show all Technical Skills */}
                    {renderProfileSection('Technical Skills', profileData.technicalSkills, [
                        { key: 'skillName', label: 'Skill Name' },
                        { key: 'experience', label: 'Experience' },
                        { key: 'verified', label: 'Verified', isBoolean: true },
                    ])}



                    {/* Show all Soft Skills */}
                    {renderProfileSection('Soft Skills', profileData.softSkills, [
                        { key: 'skillName', label: 'Skill Name' },
                        { key: 'experience', label: 'Experience' },
                        { key: 'verified', label: 'Verified', isBoolean: true },
                    ])}


                    {/* Show all Experiences */}
                    {renderProfileSection('Experiences', profileData.experiences, [
                        { key: 'industry', label: 'Industry' },
                        { key: 'jobTitle', label: 'Job Title' },
                        { key: 'experience', label: 'Experience' },
                        { key: 'verified', label: 'Verified', isBoolean: true },
                    ])}


                    {/* Show all Projects */}
                    {renderProfileSection('Projects', profileData.projects, [
                        { key: 'name', label: 'Name' },
                        { key: 'link', label: 'Link', isLink: true },
                        { key: 'skillsApplied', label: 'Skills Applied' },
                        { key: 'toolsUsed', label: 'Tools Used' },
                        { key: 'role', label: 'Role' },
                        { key: 'description', label: 'Description' },
                        { key: 'verified', label: 'Verified', isBoolean: true },
                    ])} 

                    
                    {/* Show all Achievements */}
                    {renderProfileSection('Achievements', profileData.achievements, [
                        { key: 'content', label: 'Content' },
                        { key: 'industry', label: 'Industry' },
                        { key: 'skill', label: 'Skill' },
                        { key: 'verified', label: 'Verified', isBoolean: true },
                    ])}



                    {/* Show all Endorsements */}
                    {renderProfileSection('Endorsements', profileData.endorsements, [
                        { key: 'content', label: 'Content' },
                        { key: 'endorser', label: 'Endorser' },
                        { key: 'skillsRelated', label: 'Skills Related' },
                        { key: 'verified', label: 'Verified', isBoolean: true },
                    ])}


                    {/* Show all Claims */}
                    {renderProfileSection('Claims', profileData.claims, [
                        { key: 'content', label: 'Content' },
                        { key: 'verified', label: 'Verified', isBoolean: true },
                    ])}

                
                    {/* <button onClick={resetBlockchain}>Reset Blockchain</button> */}

                </div>
            ) : (


                <div>

                    <h1 className='create-profile-header'>Create a new profile</h1>   

                    {/* Add Technical Skills */}
                    {renderProfileCreation('technicalSkills', 'Technical Skills', profile.technicalSkills, [
                        { key: 'skillName', label: 'Skill Name', type: "text" },
                        { key: 'experience', label: 'Experience', type: "number" },
                    ])}


                    {/* Add Soft Skills */}
                    {renderProfileCreation('softSkills', 'Soft Skills', profile.softSkills, [
                        { key: 'skillName', label: 'Skill Name', type: "text" },
                        { key: 'experience', label: 'Experience', type: "number" },
                    ])}



                        
                    
                   {/* Add Experiences */}
                   {renderProfileCreation('experiences', 'Experiences', profile.experiences, [
                        { key: 'industry', label: 'Industry', type: "text"},
                        { key: 'jobTitle', label: 'Job Title', type: "text" },
                        { key: 'experience', label: 'Experience', type: "number" }
                    ])}
                    



                    {/* Add Projects */}
                    {renderProfileCreation('projects', 'Projects', profile.projects, [
                        { key: 'name', label: 'Name', type: "text" },
                        { key: 'link', label: 'Link', isLink: true, type: "text" },
                        { key: 'skillsApplied', label: 'Skills Applied', isArray: true, type: "text" },
                        { key: 'toolsUsed', label: 'Tools Used', type: "text", isArray: true },
                        { key: 'role', label: 'Role', type: "text" },
                        { key: 'description', label: 'Description', type: "text" },
                    ])}

                    
                    {/* Add Achievements */}
                    {renderProfileCreation('achievements', 'Achievements', profile.achievements, [
                        { key: 'content', label: 'Content' , type: "text"},
                        { key: 'industry', label: 'Industry', type: "text"},
                        { key: 'skill', label: 'Skill Name', type: "text" },
                    ])}


                    {/* Add Endorsements */}
                    {renderProfileCreation('endorsements', 'Endorsements', profile.endorsements, [
                        { key: 'content', label: 'Content' , type: "text"},
                        { key: 'endorser', label: 'Endorser', type: "text"},
                        { key: 'skillsRelated', label: 'Skills Related', isArray: true, type: "text" },                    
                    ])} 


                    {/* Add Claims */}
                    {renderProfileCreation('claims', 'Claims', profile.claims, [
                        { key: 'content', label: 'Content' , type: "text"}           
                    ])} 


                    <button onClick={handleSubmit}>Submit and Log Profile</button>

                    {/* <button onClick={resetBlockchain}>Reset Blockchain</button> */}
                


                </div>
                

                
            )}
        </div>
    )
}

export default Profile;