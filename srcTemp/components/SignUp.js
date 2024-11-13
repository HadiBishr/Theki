import React, { useState, useEffect } from 'react';
import { signUpWithmagic, magic } from '../services/magicAuth';
import { ethers } from 'ethers'
import { useNavigate, useLocation } from 'react-router-dom'; // If you're using React Router
const {JsonRpcProvider} = require("@ethersproject/providers");



const UserProfileManagerABI = require('../abis/UserProfileManager.json');




const SignUp = ({}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const initialMode = location.state?.mode

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [authMode, setAuthMode] = useState(initialMode)
    const [signupStatus, setSignupStatus] = useState(null)
    const provider = new JsonRpcProvider('http://127.0.0.1:8545/')
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    const wallet = new ethers.Wallet(privateKey, provider)

    // Contract Details
    const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
    const contract = new ethers.Contract(contractAddress, UserProfileManagerABI, wallet)


    const handleSignUp = async () => {
        console.log(email);

        const success = await signUpWithmagic(email)
        setSignupStatus(success ? 'Signup successfull!' : 'Signup failed')

        if (success) {

            alert('Please check your email to complete the sign-up process')


            if (authMode === 'signup') {

                const loggedIn = await magic.user.isLoggedIn()
                if (loggedIn) {
                    const transaction = await contract.createBaseProfile(name)
                    await transaction.wait()
                    console.log('Profile created successfully on the blockchain')

                }

                setAuthMode('login')

            } 
        
        } else {


        }

    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await magic.user.isLoggedIn()
            if (loggedIn) {
                navigate('/dashboard')
            }
        }

        checkLoginStatus()
    }, [authMode, navigate])

    return (
        <div>

            <h1>{authMode === 'login' ? 'Login' : 'Sign Up'}</h1>


            {authMode === 'signup' ? (

                <div>

                    {/* Input fields for email and name (name only shows in signup mode) */}
                    <label>First Name and Last Name</label>
                    <input
                        type="text"
                        name="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />


                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />



                </div>

            ) : (

                <>
              
                {/* Logic for login goes here */}
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                </>


            )}

            <button onClick={handleSignUp}>{authMode === 'login' ? 'Login' : 'Sign Up'}</button>
            
           




            

        </div>
    )

}


export default SignUp;