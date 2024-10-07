import { useEffect, useState } from 'react'
import { ethers } from 'ethers'


// Components
import Navigation from './components/Navigation'

// ABIS
import ThekiTokenABI from './abis/ThekiToken.json'

// CSS
import './App.css';



function App() {

  const [account, setAccount] = useState(null) // Current MetaMask account connected to the web page
  const [provider, setProvider] = useState(null) // Ethers.js provider. This object allows us to only read data from the blockchain. You would usually use provider to only read things from the blockchain or contract.
  const [signer, setSigner] = useState(null)
  const [thekiToken, setThekiToken] = useState(null) // ThekiToken contract
  const [claims, setClaims] = useState([]) // Array of claims fetched from the contract
  const [claimContent, setClaimContent] = useState('')
  const [idToVerify, setidToVerify] = useState(null)
  const [claimIds, setClaimIds] = useState([]) // An array of claim ids of the professional. 
  const [searchAddress, setSearchAddress] = useState('')
  const [searchedClaims, setSearchedClaims] = useState([])




  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        // Create a new provider and signer using MetaMask's provider
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)

        const network = await provider.getNetwork()
        console.log('Connected network:', network);



        const signer = provider.getSigner()
        setSigner(signer)

        // Get the address of user currently connected to webpage
        const account = await signer.getAddress()
        setAccount(account)

      } catch (error) {
        console.error('Error connecting wallet:', error);
     
      } 

    } else {
      // MetaMask not installed
      alert('MetaMask not detected. Please install MetaMask to use this DApp.');

    }
  }

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
        await loadBlockchainData();

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


  // Function to verify claims
  const verifyClaims = async (idToVerify) => {
    try {

      // Send a transaction to verify the claim. 
      const transaction = await thekiToken.connect(signer).verifyClaim(idToVerify)
      await transaction.wait()

      await searchProfessionalClaims()
    } catch (error) {
      console.error('Error creating claim:', error);
    }
  
  }


  // Function to grab list of claims made by user
  const searchProfessionalClaims = async () => {
    if (!searchAddress || !ethers.utils.isAddress(searchAddress)) {
      alert('Please enter a valid Ethereum address')
      return
    }

    try {
      // Fetch claim Ids for the entered address
      const claimIds = await thekiToken.getClaimsByProfessional(searchAddress)
      if (claimIds.length === 0) {
        alert('No claims found for this address.')
        setSearchedClaims([])
        return
      }

      const claimPromises = claimIds.map(async (id) => { // Iterates over each id in the claimIds array
        const claim = await thekiToken.claims(id)
        return claim
      })

      const claims = await Promise.all(claimPromises)
      setSearchedClaims(claims)

    } catch (error) {
      console.log('Error fetching claims:', error)
      alert('An error eccoured while fetching claims')
    }
  }


  const loadBlockchainData = async () => {
    try {
      console.log("Loading blockchain data...")

      // Contract Address (Make sure contract address is correct)
      const thekiTokenAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

      // Create a new contract instance to read and write
      const thekiToken = new ethers.Contract(
        thekiTokenAddress,
        ThekiTokenABI,
        signer // signer allows us to sign transactions. Meaning write data on the contract. 
      );
      setThekiToken(thekiToken)

      // Fetch Claim Ids associated with the professional. This would be an array []
      const claimIds = await thekiToken.getClaimsByProfessional(account) // Note that this is not the claims themselves, but the claim Ids. So each thing is an an Id for a claim they made. Ie. [1, 63, 22]
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


    } catch (error) {
      console.error('Error loading blockchain data:', error)
    }




  }

  useEffect(() => {
    if (account && signer) {
      loadBlockchainData()
    }
  }, [account, signer])

  const shortenAddress = (address) => {
    if (address) {
        return address.slice(0,6) + '...' + address.slice(-4)
    }
    return ''

}




  return (
    <div>


      <div className='container'>
        {/*  Navigation  bar  */}
        <Navigation account={account} connectWallet={connectWallet}/>



        {/* Main Content. This has to do with creating a claim and listing their current claims.  */}
        <h1>Theki Token System</h1>

        {account ? (
          <>
            {/* Display connected account */}
            <p>Connected account: {shortenAddress(account)}</p>

            {/* Form to create a new claim */}
            <h2>Create a new Claim</h2>
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
            <h2>Your claims</h2>
            {claims.length > 0 ? (null) : (<h3>No Claims Made</h3>)}
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

            <h2>Get the claims of a professional</h2>
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
                <h3>Claims by {shortenAddress(searchAddress)}</h3>
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
                            <br />
                            <button onClick={() => verifyClaims(claim.id)}>Verify</button>
                          
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

    </div>

  );
}

export default App;
