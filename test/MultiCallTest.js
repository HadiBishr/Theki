const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("MultiCallTest", function () {

    let multicall, multicalltest    
    let deployer, user

    beforeEach(async () => {

        [deployer, user] = await ethers.getSigners()


        const MultiCall = await ethers.getContractFactory("MultiCall", deployer)
        multicall = await MultiCall.deploy()
        await multicall.deployed()

        const MultiCallTest = await ethers.getContractFactory("MultiCallTest", deployer)
        multicalltest = await MultiCallTest.deploy()
        await multicalltest.deployed()



    })

    it("should call multiple functions and return results", async () => {


        const setValueData = multicalltest.interface.encodeFunctionData("setValue", [100])
        
        const data = [setValueData]


        // Perfrom the multi-call using the deployer
        await multicalltest.connect(user).multiCall(data)
        // await transaction.wait()

        const result = await multicalltest.mappingValue(user.address)     // Await the promise to get the actual value
        expect(result.toNumber()).to.equal(100)  
    })

})