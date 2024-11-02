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
    const { to, subject, text } = req.body

    if (!to || !subject || !text) {
        return res.status(400).send("Missing required fields")
    }

    const confirmationLink = `http://127.0.0.1:5000/api/confirm-email?email=${encodeURIComponent(to)}`

    // Define email options
    let mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: to, // Recipient address
        subject: subject, // Subject line
        html: `
        
            <p>Please click the link below to confirm claim</p>
            <a href="${confirmationLink}">Confirm Email</a>
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

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});