const { expect } = require("chai")


describe("ThekiToken", function () { 
    let deployer
    let thekitoken

    beforeEach(async () => {
        [deployer, professional] = await ethers.getSigners()

        const ThekiToken = await ethers.getContractFactory("ThekiToken", deployer)
        thekitoken = await ThekiToken.deploy()
        await thekitoken.deployed()

        console.log(`Contract ThekiToken deployed at ${thekitoken.address}/n`)

        // Create a claim
        transaction = await thekitoken.connect(professional).createClaim("Finished Project For Theki")
        await transaction
    })

    describe("Check for creation of Claim", function () {
        it("Check Claim Counter", async () => {
            const result = await thekitoken.claimCounter()
            expect(result).to.equal(1)
        })
    })

})