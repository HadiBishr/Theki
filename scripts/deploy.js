// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat")
const { items } = require("../src/items.json")



async function main() {
    // Setup accounts
    const [deployer] = await ethers.getSigners()

    // Deploy ThekiToken contract
    const ThekiToken = await hre.ethers.getContractFactory("ThekiToken", deployer)
    thekitoken = await ThekiToken.deploy()
    await thekitoken.deployed()

    console.log(`ThekiToken contract deployed ${thekitoken.address}\n`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });