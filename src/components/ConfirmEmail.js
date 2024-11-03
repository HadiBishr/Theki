import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';



const ConfirmEmail = () => {

    const location = useLocation()
    
    // Extract Parameters from link
    const queryParams = new URLSearchParams(location.search)
    const email_verifier = queryParams.get('email_verifier')         // This is the email of the person who is verifiying
    const from = queryParams.get('from')                    // This is the address of who sent the request

    console.log('from', from)
    console.log('email_verifier', email_verifier)
    


    useEffect(() => {
        // Fetch confirmation status from backend
        const fetchConfirmation = async () => {
            try {
                const response = await fetch(`http://localhost:5001/confirm-email?email_verifier=${encodeURIComponent(email_verifier)}&from=${encodeURIComponent(from)}`)
                const data = await response.json()

                if (data.success) {
                    updateBlockchain(from)          // Execute the blockchain function to change claim to true. 
                } else {
                    console.log('Could not verify')
                }
            } catch (error) {
                console.error('Error fetching confirmation status', error)
            }
        }
    }, [email, from])


    return (
        <div>
            <h1>Hello</h1>
        </div>

    )

}