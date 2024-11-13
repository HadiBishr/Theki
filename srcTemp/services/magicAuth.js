import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';
const UserProfileManagerABI = require('../abis/UserProfileManager.json');
const {JsonRpcProvider} = require("@ethersproject/providers");


const customNodeOptions = {
    rpcUrl: 'http://127.0.0.1:8545/',      
    chainId: 31337,
}



export const magic = new Magic('pk_live_C88CDED59E10032C', { network: customNodeOptions })
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
const signer = provider.getSigner();


// const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'


// const network = await provider.detectNetwork()
// console.log("Network:", network)


// const wallet = new ethers.Wallet(privateKey, provider)

// // Contract Details
// const contractAddress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
// const contract = new ethers.Contract(contractAddress, UserProfileManagerABI, wallet)




export async function signUpWithmagic(email) {
    try {
        await magic.auth.loginWithMagicLink({email})
        return true
    } catch (error) {
        console.error('Magic authentication failed:', error)
        return false
    }
}

export async function getUserWalletAddress() {
    const userAddress = await signer.getAddress()
    return userAddress
}

