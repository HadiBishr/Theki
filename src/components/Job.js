import React from 'react';
import { ethers } from 'ethers';
import axios from 'axios'


import { jobs, profile1 } from '../ProfilesAndJobs.js'
import './css/Job.css'

const category_weights = {
    skills: 0.3,
    experiences: 0.3,
    projects: 0.2,
    achievements: 0.1,
    endorsements: 0.1, 
}

                            


const Job = ({account}) => {

    if (!jobs || jobs.length === 0) {
        return <h2>No jobs available</h2>;
    }


    return (

      
        <div className='container'>
            <h1 className="jobs-title">Jobs</h1>
            <h3>Total Jobs: {jobs.length}</h3>
            <div className='jobs-container'>

                {account ? (
                    jobs.map((job, index) => {
                        const profileText = JSON.stringify(profile1)
                        const jobText = JSON.stringify(job)
                        
    
                        return (
                            
    
                            <div key={index} className="job-card">
                                <div className="job-header">
                                    <h3 className="company-name"><strong>{job.basicInfo.companyName}</strong></h3>
                                    <h2 className="job-title"><strong>{job.basicInfo.jobTitle}</strong></h2>
                                </div>
                                <div className="job-info">
                                    <p className="theki-score">Theki Score: <span className='score-value'>  </span></p>
                                    <p className="job-salary">{job.basicInfo.workSchedule}: {job.compensation.salary}</p>
                            </div>
    
    
                        </div>
                        )
                    
                    })
                ) : (
                    <h2>Connect Account</h2>
                )}

                
                
                
          

            </div>
            
            
        </div>

        
    )
}





export default Job;