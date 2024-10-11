import React from 'react';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const VerifyClaim = ({ thekiToken, account }) => {
  const { claimId } = useParams() // Used to grab id for URL
  const [claim, setClaim] = useState(null)
  const navigate = useNavigate()


  // Handles verifying claim
  const handleVerification = async () => {
    if (thekiToken && claimId) {
      try {
        const tx = await thekiToken.verifyClaim(claimId)
        await tx.wait()
        alert('Claim verified successfully')
        navigate('/')
      } catch (error) {
        console.error('Error verifying claim:', error)
        alert('An error occured during the verification process')
      }
    }
  }

  useEffect(() => {
    const fetchClaim = async () => {
      if (thekiToken && claimId) {
        try {
          // Fetch claim data from contract using claimId
          const claim = await thekiToken.claims(claimId)
          setClaim(claim)
        } catch (error) {
          console.error('Error fetching claim data:', error)
        }
      }
    }

    fetchClaim()
  }, [thekiToken, claimId])

  return (
    <div className="container">
      <h2>Verify Claim</h2>
      <p>Claim ID: {claimId}</p>

      {claim ? (
        <div>
          <p><strong>Content:</strong> {claim.content} </p>
          <p><strong>Verified:</strong> {claim.verified.toString()} </p>
          <p>
            Click the button below to verify the claim. This will create a blockchain transaction to mark the claim as verified.
          </p>
          <button onClick={handleVerification}>Verify Claim</button>
        </div>
      ) : (
        <p>Loading claim details...</p>
      )}

      
      
      <button onClick={() => navigate('/')} style={{ marginLeft: '1rem' }} >Cancel</button>


    </div>
  )
}

export default VerifyClaim;