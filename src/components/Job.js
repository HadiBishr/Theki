import React from 'react';
import { ethers } from 'ethers';


import './css/Job.css'


const Job = ({ jobs }) => {

    if (!jobs || jobs.length === 0) {
        return <h2>No jobs available</h2>;
    }


    return (

      
        <div className='container'>
            <h1 className="jobs-title">Jobs</h1>
            <h3>Total Jobs: {jobs.length}</h3>
            <div className='jobs-container'>

                {jobs.map((job, index) => (
                
                <div key={index} className="job-card">
                    <div className="job-header">
                        <h3 className="company-name"><strong>{job.basicInfo.companyName}</strong></h3>
                        <h2 className="job-title"><strong>{job.basicInfo.jobTitle}</strong></h2>
                    </div>
                    <div className="job-info">
                        <p className="theki-score">Theki Score: <span className='score-value'> {job.thekiScore.toString()} </span></p>
                        <p className="job-salary">{job.basicInfo.workSchedule}: {job.compensation.salary}</p>
                    </div>


                </div>
                ))}

            </div>
            
            
        </div>

        
    )
}





export default Job;