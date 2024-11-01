const { expect } = require("chai")


describe("MultiCallTest", function () {

    let multicall, multicalltest    
    let deployer, user
    let transaction

    beforeEach(async () => {

        [deployer, user] = await ethers.getSigners()


        const MultiCall = await ethers.getContractFactory("MultiCall", deployer)
        multicall = await MultiCall.deploy()
        await multicall.deployed()

        const MultiCallTest = await ethers.getContractFactory("MultiCallTest", deployer)
        multicalltest = await MultiCallTest.deploy()
        await multicalltest.deployed()


        target = []
        data = []


        target.push(multicalltest.address)
        data.push(multicalltest.interface.encodeFunctionData("test", [1]))

        transaction = await multicall.connect(user).multiCall(target, data)
        await transaction.wait()

    })

    it("Check if it worked", async () => {
        const result = await multicalltest.getNumber(1)     // Await the promise to get the actual value
        expect(result.toNumber()).to.equal(1)  
    })

})