import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import { ethers } from 'ethers'



// Components
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import VerifyClaim from './components/VerifyClaim'
import Job from './components/Job'

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

  const [jobIds, setJobIds] = useState([])
  // const [jobs, setJobs] = useState([])




  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        // Create a new provider and signer using MetaMask's provider
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provider)
        console.log(`Provider: ${provider}`)

        const network = await provider.getNetwork()
        console.log('Connected network:', network);



        const signer = provider.getSigner()
        setSigner(signer)
        console.log(`Signer: ${signer}`)


        // Get the address of user currently connected to webpage
        const account = await signer.getAddress()
        setAccount(account) 
        console.log(`Account: ${account}`)



      } catch (error) {
        console.error('Error connecting wallet:', error);
     
      } 

    } else {
      // MetaMask not installed
      alert('MetaMask not detected. Please install MetaMask to use this DApp.');

    }
  }



  const disconnectWallet = async () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
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

      // claims for the searched address
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

      console.log("The Signer and Contract have been set.")

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






      // Get all Jobs
      // const jobIds = await thekiToken.getAllJobIds()
      // setJobIds(jobIds)

      // console.log("Got All Job Ids")

      // const jobPromises = jobIds.map(async (id) => {
      //   const job = await thekiToken.getJob(id)
      //   return job
      // })

      // const jobs = await Promise.all(jobPromises)
      // setJobs(jobs)

      // console.log("Jobs array:", jobs)

      // console.log("Got All Jobs")

      // if (jobs.length > 0) {
      //   console.log("Jobs exist")
      // }


      // The above code ignore until we put jobs and profiles onto the blockchain




    } catch (error) {
      console.error('Error loading blockchain data:', error)
    }




  }

  useEffect(() => {
    if (!provider || !signer) {
      console.error('Provider or signer is not initialized yet');
    }

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


    <Router>


      <Navigation account={account} connectWallet={connectWallet} disconnectWallet={disconnectWallet}/>

      <Routes>

        <Route 
          path="/" 
          element={
            <>
              <Dashboard 
                claims={claims}
                setClaims={setClaims}
                account={account}
                shortenAddress={shortenAddress}
                claimContent={claimContent}
                setClaimContent={setClaimContent}
                thekiToken={thekiToken}
                searchAddress={searchAddress}
                setSearchAddress={setSearchAddress}
                searchProfessionalClaims={searchProfessionalClaims}
                createClaims={createClaims}
                searchedClaims={searchedClaims}
                verifyClaims={verifyClaims}

              />

              {/* Add loop here to loop over jobs */}
              <Job/>

              
            </>
          }
        />

        <Route 
          path="verify/:claimId"
          element={
            <VerifyClaim thekiToken={thekiToken} account={account} signer={signer} searchProfessionalClaims={searchProfessionalClaims}/>
          }

          
        
        />


      </Routes>



    </Router>


    

  );
}

export default App;
