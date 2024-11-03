const express = require('express')                  // A lightweight framework to create a web server and handle HTTP requests.
const nodemailer = require('nodemailer')            // A library that simplifies sending emails through various SMTP providers.
const dotenv = require('dotenv')                    // A module to load environment variables from a .env file. This helps keep sensitive information, like email credentials, outside the codebase.
const cors = require('cors')                        // A middleware that allows Cross-Origin Resource Sharing, enabling the backend to handle requests from a different domain or port (useful for API endpoints accessed from a frontend on another server).



dotenv.config() 

console.log("Email user:", process.env.EMAIL_USER);
console.log("Email password:", process.env.EMAIL_PASSWORD);// Load environment variables from .env file

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


app.post('/send-email', async (req, res) => {
    const { to, subject, text, from } = req.body

    if (!to || !subject || !text) {
        return res.status(400).send("Missing required fields")
    }

    // Set up the confirmation link (for now it is just a localhost link)
    const confirmationLink = `http://127.0.0.1:5001/confirm-email?email_verifier=${encodeURIComponent(to)}&from=${encodeURIComponent(from)}`  // We encode it so that there are no issues because some issues may arise when you use @. Anything after ? in the url are query parameters, or in other words like variables. 

    // Define email options
    let mailOptions = {
        from: process.env.EMAIL_USER, // Sender address. This will stay constant between users because 
        to: to, // Recipient address
        subject: subject, // Subject line
        html: `
            <p>You have a verification request from wallet address: <strong>${from}</strong></p>
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
app.get('/confirm-email', (req, res) => {
    const { email_verifiern, from } = req.query             // req.query grabs any query parameters that are part of the URL. Specifically the ones that come after the ? symbol. 

    // Log confirmationto the console
    console.log(`Email confirmed for: ${email_verifier}`)

    // Respond with a simple message
    res.json({ success: true, message: `Claim Confirmed` })
})

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});