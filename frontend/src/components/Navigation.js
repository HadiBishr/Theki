import { ethers } from 'ethers'
import './Navigation.css'

const Navigation = ({ account, connectWallet }) => {
    // FUntion to shorten the account address for display purposes
    const shortenAddress = (address) => {
        if (address) {
            return address.slice(0,6) + '...' + address.slice(-4)
        }
        return ''

    }

    return (
        <nav>

            <div className='nav__brand'>
                <h1>Theki</h1>
            </div>

        

            { account ? (
                // Show address if account is connected
                <button 
                    type="button"
                    className='nav__connect'
                >

                    {shortenAddress(account)}

                </button>

            ) : (
                // If account is not connected, it will just show "Connect". And you can click the button and that will activate the connectWallet function we created on App.js which will just connect the wallet. 
                <button 
                    type="button" 
                    className='nav__connect'
                    onClick={connectWallet}
                >

                    Connect

                </button>


            )}


        </nav>
    );
}

export default Navigation;