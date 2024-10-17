import React,  {useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios'


import { jobs, profile1 } from '../ProfilesAndJobs.js'
import './css/Job.css'

const category_weight = {
    skills: 0.3,
    experiences: 0.3,
    projects: 0.2,
    achievements: 0.1,
    endorsements: 0.1, 
}

                            


const Job = ({account}) => {


    const calculateThekiScore = async (profile, job, weights) => {
        try {
            
                
            const profileText = JSON.stringify(profile)
            const jobText = JSON.stringify(job)
            const weightsText = JSON.stringify(weights)

            // Make a request to the Flask API for each job
            const response = await axios.post('http://127.0.0.1:5000/calculate_similarity', {
                profile: profileText,
                job: jobText,
                category_weights: weightsText
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            return response.data.similarity * 100
              

        } catch (error) {
            console.error("Error calculating Theki Score:", error)
            return 0
        }
    }



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
                        
                        let thekiScore = 0

                        // Calculate the Theki score for each job
                        calculateThekiScore(profile1, job, category_weight)
                            .then((score) => {
                                thekiScore = score
                            })
                            .catch((error) => {
                                console.error('Error calculating score', error)
                            })
    
                        return (
                            
    
                            <div key={index} className="job-card">
                                <div className="job-header">
                                    <h3 className="company-name"><strong>{job.basicInfo.companyName}</strong></h3>
                                    <h2 className="job-title"><strong>{job.basicInfo.jobTitle}</strong></h2>
                                </div>
                                <div className="job-info">
                                    <p className="theki-score">Theki Score: <span className='score-value'> {thekiScore.toFixed(2)} </span></p>
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