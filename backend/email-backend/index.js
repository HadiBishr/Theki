const express = require('express')                  // A lightweight framework to create a web server and handle HTTP requests.
const nodemailer = require('nodemailer')            // A library that simplifies sending emails through various SMTP providers.
const dotenv = require('dotenv')                    // A module to load environment variables from a .env file. This helps keep sensitive information, like email credentials, outside the codebase.
const cors = require('cors')                        // A middleware that allows Cross-Origin Resource Sharing, enabling the backend to handle requests from a different domain or port (useful for API endpoints accessed from a frontend on another server).\
const { ethers } = require('ethers')
const {JsonRpcProvider} = require("@ethersproject/providers");


const UserProfileManagerABI = require('../../src/abis/UserProfileManager.json');
const { network } = require('hardhat')


// This is because we cant directly pass a string when it requires an enum into the verify function. 
const VerificationType = {
    TechnicalSkills: 0,
    SoftSkills: 1,
    Experiences: 2,
    Projects: 3,
    Achievements: 4,
    Endorsements: 5,
    Claims: 6
};



dotenv.config() 

console.log("Email user:", process.env.EMAIL_USER);
console.log("Email password:", process.env.EMAIL_PASSWORD);// Load environment variables from .env file
console.log("Contract Address:", process.env.CONTRACT_ADDRESS)
console.log("Network Provider:", process.env.BLOCKCHAIN_RPC_URL)

const app = express()
app.use(express.json())
app.use(cors())                                     // Allow frontend requests


const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
})

const provider = new JsonRpcProvider('http://127.0.0.1:8545/')
const privateKey = process.env.PRIVATE_KEY

async function network_get() {
    const network = await provider.detectNetwork()
    console.log("Network:", network)
}



network_get()

console.log('Provider:', provider)


const wallet = new ethers.Wallet(privateKey, provider)

// Contract Details
const contractAddress = process.env.CONTRACT_ADDRESS    
const contract = new ethers.Contract(contractAddress, UserProfileManagerABI, wallet)


app.post('/send-email', async (req, res) => {
    const { to, subject, text, from, title, index, name } = req.body            // to will be in the format of an email, and from will be the address of the user. 

    if (!to || !subject || !text) {
        return res.status(400).send("Missing required fields")
    }

    // Set up the confirmation link (for now it is just a localhost link)
    const confirmationLink = `http://127.0.0.1:3000/confirm-email?email_verifier=${encodeURIComponent(to)}&from=${from}&title=${title}&index=${index}&name=${name}`  // We encode it so that there are no issues because some issues may arise when you use @. Anything after ? in the url are query parameters, or in other words like variables. 

    // Define email options
    let mailOptions = {
        from: process.env.EMAIL_USER, // Sender address. This will stay constant between users because 
        to: to, // Recipient address
        subject: subject, // Subject line
        html: `
            <p>You have a verification request from wallet address: <strong>${name}</strong></p>
            <p>You will be verifying: <strong>${title}</strong> </p>
            <p>Please click the link below to confirm claim</p>
            <a href="${confirmationLink}">Confirm Profile</a>
        `
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
})

// This is basically once the user lands on the /confirm-email, it runs the following. 
app.get('/confirm-email', async (req, res) => {                   // res (response) manages the response back to the client
    const { email_verifier, from, title, index } = req.query             // req.query grabs any query parameters that are part of the URL. Specifically the ones that come after the ? symbol. 

    const verificationTypeString = title.replace(/\s+/g, '')
    const verificationTypeEnum = VerificationType[verificationTypeString]
    
    try {
        const transaction = await contract.verify(from, verificationTypeEnum, index)
        await transaction.wait()
        res.json({ success: true, message: "Claim confirmed successfully" });
    } catch (error) {
        console.error("An Error has occured during the transaction:", error)
        res.json({ success: false, message: 'Transaction failed' });
    }
    

})

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});