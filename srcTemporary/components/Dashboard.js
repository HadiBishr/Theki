// Dashboard.js
import { React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';


// CSS
import '../App.css';



const Dashboard = ({
    account, 
    shortenAddress, 
    thekiToken,
    signer,
    searchProfessionalClaims,
    loadBlockchainData,
    searchAddress,
    setSearchAddress,
    searchedClaims,
    setSearchedClaims
}) => {

    const navigate = useNavigate();
  
    // Handle verify button click to navigate to the verification page
    const handleVerifyClick = (claimId) => {
      navigate(`/verify/${claimId}`);
    };

    const [claims, setClaims] = useState([]) // Array of claims fetched from the contract
    const [claimContent, setClaimContent] = useState('')
    const [claimIds, setClaimIds] = useState([]) // An array of claim ids of the professional. 


    // Function to handle the creation of a new claim
    const createClaims = async () => {
        if (thekiToken && claimContent) {
            try {
                console.log('Creating claim with content:', claimContent);

                // Send a transaction to create a new claim
                const transaction = await thekiToken.connect(signer).createClaim(claimContent)

                console.log('Transaction sent:', transaction.hash);
                await transaction.wait();
                console.log('Transaction confirmed');

                


                setClaimContent('') // This just clears the input field because once you click enter, we want the input field to be clear.
                await loadClaims()

            } catch (error) {
                console.error('Error creating claim:', error);

                // Extract error details
                if (error.reason) {
                console.error('Revert reason:', error.reason);
                }
                if (error.code) {
                console.error('Error code:', error.code);
                }
                if (error.data && error.data.message) {
                console.error('Error data message:', error.data.message);
                }
                alert(`Error creating claim: ${error.message}`);
            }
        }
    }




    const loadClaims = async () => {
        // Fetch Claim Ids associated with the professional. This would be an array 
        const claimIds = await thekiToken.getClaimsByProfessional(account) // Note that this is not the claims themselves, but the claim Ids. So each thing is an an Id for a claim they made.
        setClaimIds(claimIds)
        console.log('Claim IDs:', claimIds)


        // Fetch details of claim by using each claim id
        const claimPromises = claimIds.map(async (id)  => { // Iterates over each id in the claimIds array
            const claim = await thekiToken.claims(id)
            return claim
        })

        // claimPromises is now an array of promises where each promise corresponds to the asynchronous operation of fetching a claim by its ID. This means that every promise will run the above, which gets the claim Struct.


        // Fulfills all promises and creates an array of the claim data for each promise in claimPromises
        const claims = await Promise.all(claimPromises) 
        console.log('Claims Data:', claims); 

        setClaims(claims) 
    }

    useEffect(() => {
        if (account) {
            loadBlockchainData()  // You have to run this first to get the contract. 
            loadClaims()

        }
        
    }, [account])


    return (

        <div className='container'>
            {/* Main Content. This has to do with creating a claim and listing their current claims.  */}
            <h1 className='titles'>Theki Token System</h1>

            {account ? (
            <>
                {/* Display connected account */}
                <p>Connected account: {shortenAddress(account)}</p>

                {/* Form to create a new claim */}
                <h2 className='titles'>Create a new Claim</h2>
                <input 
                type="text" 
                value={claimContent} 
                onChange={(e) => setClaimContent(e.target.value)} 
                placeholder="Enter your claim"
                />
                <button onClick={createClaims} disabled={!thekiToken}>
                Submit Claim
                </button>

                
                {/* Display list of claims */}
                <h2 className='titles'>Your claims</h2>
                {claims.length > 0 ? (null) : (<h3 className='titles'>No Claims Made</h3>)}
                <ul>
                {claims.map((claim, index) => ( // claim is the whole struct. Meaning you can call the 4 values of the struct. Id, address of who made the claim, content of the claim and if verified
                    <li key={index}>
                    ID: {claim.id.toString()} | Content: {claim.content} | Verified: {claim.verified.toString()}
                    </li>
                ))}
                </ul>
    
            </>
            ) : (
            // Prompt user to connect wallet if not connected
            <p>Please connect your wallet to use the Application</p>
            )}
        
        



            { /* Everything below has to do with searching a user and verifying claims. */ }  
            
            <section>
            {account ? (
                <>

                <h2 className="text-red-500">Get the claims of a professional</h2>
                <input 
                type="text" 
                value={searchAddress} 
                onChange={(e) => setSearchAddress(e.target.value)} 
                placeholder="Enter professional's address"
                />
                <button onClick={searchProfessionalClaims}>
                Grab Claims
                </button>


                { /* This checks if the searchedClaims array is filled. If it is it will show the claims that the user searched. If the array does not exist it will do nothing.  */ }
                {searchedClaims.length > 0 && (
                <div>
                    <h3 className='titles'>Claims by {shortenAddress(searchAddress)}</h3>
                    <ul>
                    {searchedClaims.map((claim, index) => (
                        <li key={index}>
                        <strong>ID:</strong> {claim.id.toString()} <br />
                        <strong>Content:</strong> {claim.content} <br />
                        <strong>Verified:</strong> {claim.verified.toString()} <br />

                        {/* This checks if the claim is verified or not. Also checks if the account that is verifying the claim is not the same account that created it. If both pass, then the verify button will show up.  */}

                        {!claim.verified && 
                            claim.professional.toLowerCase() !== account.toLowerCase() && (
                            <>
                                {console.log("Creating Verify Button")}
                                <br />
                                <button onClick={() => handleVerifyClick(claim.id)}>Verify</button>
                            
                            </>
                            )
                        
                        }
                        </li>
                    ))}
                    </ul>


                </div>
                )}


                </>

            ) : (
                null

            )}

            </section>  

        </div>

    )
}




export default Dashboard;