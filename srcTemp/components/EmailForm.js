import { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom'; // To link to the user profile page



const EmailForm =  () => {
    const location = useLocation()
    const title = location.state?.title
    const account = location.state?.account
    const index = location.state?.index
    const name = location.state?.name

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [statusMessage, setStatusMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()          // Prevent the default submission if the event does not get handled properly. 

        try {
            const response = await fetch('http://localhost:5001/send-email', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: email,
                    from: account,
                    subject: "Verifying Profile",
                    text: message,
                    title: title,
                    index: index,
                    name: name
                })
            })

            if (response.ok) {
                setStatusMessage('Email sent successfully')
            } else {
                setStatusMessage('Failed to send email. Please try again')
            }
        
        } catch (error) {
            console.error('Error:', error)
            setStatusMessage('An error occured. Please check the console for details')
        }
    }

    return (


       

        <div>

            <h1>Verifying { title.substring(0, title.length - 1) }</h1>

            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> <br /><br />

                <label htmlFor='message'></label>
                <input 
                    type="text"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />


         
                <button type="submit">Send Verification</button>
                

                
                
                


            </form>

            {statusMessage && <p>{statusMessage}</p>}

        </div>
    )


}


export default EmailForm;