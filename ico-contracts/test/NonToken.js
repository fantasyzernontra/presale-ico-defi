const { expect } = require('chai')

const { ToWei } = require('../utils/useToWei')

let NonToken
let token
const totalSupply = "1000000"

beforeEach(async () => {
	NonToken = await ethers.getContractFactory('NonToken')
	token = await NonToken.deploy()
})

describe('NON Token', () => {
	it('Should deploy NON Token contract successful', async () => {
		expect(token.address)
	})

	it('Should mint NON Token with correct given total supply', async () => {
		await token.mint(ToWei(totalSupply))
		expect(await token.totalSupply()).to.equal(ToWei(totalSupply))
	})

	it('Should transfer NON Token between accounts', async () => {
		const [owner, addr1, addr2] = await ethers.getSigners()
		await token.mint(ToWei("1000"))

		// Transfer 50 NON Tokens from owner to addr1
		await token.transfer(addr1.address, 50)
		expect(await token.balanceOf(addr1.address)).to.equal(50)

		// Transfer 50 NON Tokens from addr1 to addr2
		await token.connect(addr1).transfer(addr2.address, 50)
		expect(await token.balanceOf(addr1.address)).to.equal(0)
		expect(await token.balanceOf(addr2.address)).to.equal(50)
	})

	// it('', async () => {
	// 	// Approve transaction
	// 	await token.connect(addr1).approve(owner.address, 0)

	// 	await token.connect(owner).transferFrom(addr1.address, addr2.address, 0)
	// })
})
