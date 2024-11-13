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
    const [thekiScores, setThekiScores] = useState([])


    useEffect(() => {

        const calculateThekiScore = async (profile, job, weights) => {
            const scores = await Promise.all(
                jobs.map(async (job) => {

                    try {
    
                        // Make a request to the Flask API for each job
                        const response = await axios.post('http://localhost:5000/calculate_score', {
                            profile: profile1,
                            job: job,
                            category_weights: category_weight
                        }, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
            
                        console.log("Here is the score:", response.data.theki_score)
            
                        return response.data.theki_score 
                          
            
                    } catch (error) {
                        console.error("Error calculating Theki Score:", error)
                        return 0
                    }

                })

                

            )

            setThekiScores(scores)
            
        }

        if (account) {
            calculateThekiScore()
        }

    }, [account])



    



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

                        return (

                            <div key={index} className="job-card">
                                <div className="job-header">
                                    <h3 className="company-name"><strong>{job.basic_info.company_name}</strong></h3>
                                    <h2 className="job-title"><strong>{job.basic_info.job_title}</strong></h2>
                                </div>
                                <div className="job-info">
                                    <p className="theki-score">Theki Score: <span className='score-value'> {thekiScores[index]?.toFixed(2)} </span></p>
                                    <p className="job-salary">{job.basic_info.work_schedule}: {job.compensation.salary}</p>
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