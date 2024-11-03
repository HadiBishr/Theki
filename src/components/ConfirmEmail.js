import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';



const ConfirmEmail = () => {

    const location = useLocation()
    
    // Extract Parameters from link
    const queryParams = new URLSearchParams(location.search)
    const email_verifier = queryParams.get('email_verifier')         // This is the email of the person who is verifiying
    const from = queryParams.get('from')                             // This is the address of who sent the request
    const title = queryParams.get('title')
    const index = queryParams.get('index')
    const name = queryParams.get('name')

    console.log('from', from)
    console.log('email_verifier', email_verifier)
    



    // Fetch confirmation status from backend
    const fetchConfirmation = async () => {
        try {
            const response = await fetch(`http://localhost:5001/confirm-email?email_verifier=${encodeURIComponent(email_verifier)}&from=${from}&title=${title}&index=${index}`)
            const data = await response.json()

            if (data.success) {
                console.log("Verified, NICE!")
            } else {
                console.log('Could not verify')
            }
        } catch (error) {
            console.error('Error fetching confirmation status', error)
        }
    }



    return (
        <div>
            <h1>Verifying {title.substring(0, title.length - 1)} from {name}</h1>

            <button onClick={fetchConfirmation}>Verify Claim</button>
        </div>

    )

}