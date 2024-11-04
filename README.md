# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```

# Setup

## How to setup MetaMask

### Adding Custom HardHat Network 
#### 1. To connect the account from the hardhat test network, we have to create a custom hardhat network
#### 2. Click "Add Custom Network" once in the network selection popup. 
#### 3. Enter Network Name as "HardHat"
#### 4. Enter Default RPC URL as "http://127.0.0.1:8545/"
#### 5. Enter Chain Id as "31337"
#### 6. Enter the Currency Symbol as "ETH"
#### 7. Then click save. 

### Adding Test Accounts with 10000ETH preloaded
#### 1. Click the accounts button at the top and select "Add account or hardware wallet"
#### 2. Click "Import account"
#### 3. Go to terminal where you ran "npx hardhat node" and select the private key of any one of the 20 accounts created. 
#### 4. Paste the private key into the box in metamask to import the account
#### 5. Then rename the account to HardHat{whatever account number you choose}


## List of commands to run the whole project (Run in order for 1-4)

### (Make sure you are in the Theki directory, if not then run "cd Theki")
### (Also make sure you are running each of these 4 commands in 4 different terminal tabs)
### 1. npx hardhat node
### 2. npx hardhat run scripts/deploy.js --network localhost
### 3. npm start
### 4. python app.py
### 5. To open up a browser with CORS disabled, run the following command, and replace the file path to where you browser is stored. 
#### a. "open -n -a /Applications/Brave\ Browser.app/Contents/MacOS/Brave\ Browser --args --user-data-dir="/tmp/brave_dev_sess_1" --disable-web-security"

# How does Profile.js Work and its components? 

We have a couple of functions and each will be explained below:


# Errors and Fixes:

## Error 1 (react-refresh):

```shell
Compiled with problems:
×
ERROR in ./src/App.js 1:40-111
Module not found: Error: You attempted to import /Users/hadibishr/Theki/node_modules/react-refresh/runtime.js which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.
You can either move it inside src/, or add a symlink to it from project's node_modules/.
```

### Fix: 

To fix thix this you have to remove react-refresh from devDeps in package.json. And possibly also craco.config.js. 




