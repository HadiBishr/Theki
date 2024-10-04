const { expect } = require("chai")


describe("ThekiToken", function () { 
    let deployer
    let thekitoken

    beforeEach(async () => {
        [deployer, professional] = await ethers.getSigners()

        const ThekiToken = await ethers.getContractFactory("ThekiToken", deployer)
        thekitoken = await ThekiToken.deploy()
        await thekitoken.deployed()

        // Create a claim
        transaction = await thekitoken.connect(professional).createClaim("Finished Project For Theki")
        await transaction
    })

    describe("Check for creation of Claim", function () {
        it("Check Claim Counter", async () => {
            const result = await thekitoken.claimCounter()
            expect(result).to.equal(1)
        })

        describe("Check each detail in single Claim", function () {
            it("Check Claim ID", async () => {
                const result = await thekitoken.claims(1)
                expect(result.id).to.equal(1)
            })

            it("Check address of professional who made claim", async () => {
                const result = await thekitoken.claims(1)
                expect(result.professional).to.equal(professional.address)
            })

            it("Check verification of claim", async () => {
                const result = await thekitoken.claims(1)
                expect(result.verified).to.equal(false)
            })

        })

    
    describe("Verify Claim", function () {

        beforeEach(async () => {
            transaction = await thekitoken.connect(deployer).verifyClaim(1)
            await transaction
        })


        it("Check verification of claim after veritication", async () => {
            const result = await thekitoken.claims(1)
            expect(result.verified).to.equal(true)
        })
    })

    })

})