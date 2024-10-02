const { expect } = require("chai")


describe("Theki", function () {

  let deployer, professional
  let theki


  beforeEach(async () => {
    [deployer, professional] = await ethers.getSigners()

    const Theki = await ethers.getContractFactory("Theki", deployer)
    theki = await Theki.deploy()
    await theki.deployed()

    transaction = await theki.connect(professional).addProfile("Hadi", ["Python", "Javascript"], [3, 6], ["Flask", "Hardhat"], [1, 2])
    await transaction

  })

  describe("Check Add Profile", function () {

    it("Check for Next Profile Id", async () => {
      const result = await theki.NextProfileId()
      expect(result).to.equal(2)
    })

    it("Check If Experience Duration is Correct", async () => {
      // Fetch profile with ID 1
      const result = await theki.profiles(1)

      // Accessing the first technical skill from the result
      const technicalSkill = result.skills.technicalSkills[0]

      // Now you can access individual properties
      const experienceDuration = technicalSkill.experienceMonths
      expect(experienceDuration).to.equal(3)
      console.log("Experience Duration:", experienceDuration.toString())
    })

    it("Check If Skill Name is Correct", async () => {
      // Fetch profile with ID 1
      const result = await theki.profiles(1)

      // Accessing the first technical skill from the result
      const technicalSkill = result.skills.technicalSkills[0]

      // Now you can access individual properties
      const skillname = technicalSkill.skillName
      console.log("Skill Name:", skillname)
    })

    it("Check If Validation is Correct", async () => {
      // Fetch profile with ID 1
      const result = await theki.profiles(1)

      // Accessing the first technical skill from the result
      const technicalSkill = result.skills.technicalSkills[0]

      // Now you can access individual properties
      const verification = technicalSkill.verified
      expect(verification).to.equal(false)
      console.log("Verification Status:", verification)
    })

    

  })

})