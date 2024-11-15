import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Correct import
import { ethers } from 'ethers'



// Components
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import VerifyClaim from './components/VerifyClaim'
import Job from './components/Job'
import Profile from './components/Profile'
import EmailForm from './components/EmailForm'
import ConfirmEmail from './components/ConfirmEmail'
import FrontPage from './components/FrontPage'
import SignUp from './components/SignUp'

// ABIS
import ThekiTokenABI from './abis/ThekiToken.json'
import JobManagerABI from './abis/JobManager.json'
import UserProfileManagerABI from './abis/UserProfileManager.json'

// CSS
import './App.css';
import { Sign } from '@tensorflow/tfjs';




function App() {

  const [account, setAccount] = useState(null) // Current MetaMask account connected to the web page
  const [provider, setProvider] = useState(null) // Ethers.js provider. This object allows us to only read data from the blockchain. You would usually use provider to only read things from the blockchain or contract.
  const [signer, setSigner] = useState(null)
  const [network, setNetwork] = useState(null)
  const [thekiToken, setThekiToken] = useState(null) // ThekiToken contract
  const [profileManagerContract, setProfileManagerContract] = useState(null) // Profile Manager contract

  const [idToVerify, setidToVerify] = useState(null)
  const [claimIds, setClaimIds] = useState([]) // An array of claim ids of the professional. 
  const [searchAddress, setSearchAddress] = useState('')
  const [searchedClaims, setSearchedClaims] = useState([])

  const [jobIds, setJobIds] = useState([])
  const [jobs, setJobs] = useState([])
  const [profileData, setProfileData] = useState(null)

  const location = useLocation()




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
        setNetwork(network)
        console.log('Connected network:', network);



        const signer = provider.getSigner()
        setSigner(signer)
        console.log(`Signer: ${signer}`)


        // Get the address of user currently connected to webpage
        const account = await signer.getAddress()
        setAccount(account) 
        console.log(`Account: ${account}`)
        
        // localStorage.setItem("isWalletConnected", "true")


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

    // localStorage.removeItem("isWalletConnected")
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
      setProfileManagerContract(profileManagerContract)


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

    if (location.pathname === '/confirm-email') return;

    // if (!provider || !signer) {
    //   console.error('Provider or signer is not initialized yet');
    // }

    // if (account && signer) {
    //   loadBlockchainData();
    // }

   
  }, [location.pathname])






  const shortenAddress = (address) => {
    if (address) {
        return address.slice(0,6) + '...' + address.slice(-4)
    }
    return ''

}







  return (


    <div>


      {location.pathname !== '/confirm-email' && (
        <Navigation account={account} connectWallet={connectWallet} disconnectWallet={disconnectWallet} profileData={profileData}/>
      )}

    

      <Routes>

        <Route 
          path="/" 
          element={
            <>
              <FrontPage />
              
            </>
          }
        />

        <Route 
          path="/dashboard"
          element={
            <Dashboard />
          }
          
        />
        <Route 
          path="/profile"
          element={
            <Profile account={account} profileData={profileData} profileManagerContract={profileManagerContract} signer={signer} network={network}/>
          }
        
        />

        <Route 
          path="verify/:claimId"
          element={
            <VerifyClaim thekiToken={thekiToken} account={account} signer={signer} searchProfessionalClaims={searchProfessionalClaims}/>
          }

          
        
        />

        <Route 
          path="/email-form"
          element={
            <EmailForm/>
          }
        />

        <Route 
          path='/confirm-email'
          element={
            <ConfirmEmail />
          }
          
        />

        <Route 
          path='/sign-up'
          element={
            <SignUp profileManagerContract={profileManagerContract}/>
          }
        />

      </Routes>



    </div>


    

  );
}

export default App;
