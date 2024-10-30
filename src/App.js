import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
import { ethers } from 'ethers'



// Components
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import VerifyClaim from './components/VerifyClaim'
import Job from './components/Job'
import Profile from './components/Profile'

// ABIS
import ThekiTokenABI from './abis/ThekiToken.json'
import JobManagerABI from './abis/JobManager.json'
import UserProfileManagerABI from './abis/UserProfileManager.json'

// CSS
import './App.css';





function App() {

  const [account, setAccount] = useState(null) // Current MetaMask account connected to the web page
  const [provider, setProvider] = useState(null) // Ethers.js provider. This object allows us to only read data from the blockchain. You would usually use provider to only read things from the blockchain or contract.
  const [signer, setSigner] = useState(null)
  const [thekiToken, setThekiToken] = useState(null) // ThekiToken contract

  const [idToVerify, setidToVerify] = useState(null)
  const [claimIds, setClaimIds] = useState([]) // An array of claim ids of the professional. 
  const [searchAddress, setSearchAddress] = useState('')
  const [searchedClaims, setSearchedClaims] = useState([])

  const [jobIds, setJobIds] = useState([])
  const [jobs, setJobs] = useState([])
  const [profileData, setProfileData] = useState(null)




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
    // Reset the wallet-related state variables
    setAccount(null);
    setProvider(null);
    setSigner(null);
  };




  // // Function to grab list of claims made by user
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

      


      const userProfileManagerAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
      const jobManagerAddress = '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0'


      // Create profile contract instance
      const profileManagerContract = new ethers.Contract(
        userProfileManagerAddress,
        UserProfileManagerABI,
        signer
      )

      const jobManagerContract = new ethers.Contract(
        jobManagerAddress,
        JobManagerABI,
        signer
      )


      // Fetch the user profile
      const profileExists = await profileManagerContract.profileExists(account)
      console.log("Account:", account)
      if (profileExists) {
        const profileData = await profileManagerContract.connect(signer).getUserProfile(account)
        setProfileData(profileData)
        console.log("Profile Data:", profileData)
      } else {
        console.log("No profile exists for this account")
        setProfileData(null)
      }



      // Fetch all Jobs
      const jobIds = await jobManagerContract.getAllJobIds()
      setJobIds(jobIds)

      console.log("Got All Job Ids")

      const jobPromises = jobIds.map(async (id) => {
        const job = await jobManagerContract.getJob(id)
        return job
      })

      const jobs = await Promise.all(jobPromises)
      setJobs(jobs)

      console.log("Jobs array:", jobs)

      console.log("Got All Jobs")

      if (jobs.length > 0) {
        console.log("Jobs exist")
      }


  


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


      <Navigation account={account} connectWallet={connectWallet} disconnectWallet={disconnectWallet} profileData={profileData}/>

      <Routes>

        <Route 
          path="/" 
          element={
            <>
              <Dashboard 
                account={account}
                shortenAddress={shortenAddress}
                thekiToken={thekiToken}
                searchProfessionalClaims={searchProfessionalClaims}
                signer={signer}
                loadBlockchainData={loadBlockchainData}
                searchAddress={searchAddress}
                setSearchAddress={setSearchAddress}
                searchedClaims={searchedClaims}
                setSearchedClaims={setSearchedClaims}
              />

              {/* Add loop here to loop over jobs */}
              <Job account={account}/>

              
            </>
          }
        />
        <Route 
          path="/profile"
          element={
            <Profile account={account} profileData={profileData} />
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
