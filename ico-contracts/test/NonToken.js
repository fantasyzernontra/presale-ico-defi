const { expect } = require('chai')

const { ToWei } = require('../utils/useToWei')

let NonToken
let token
const totalSupply = '1000000'

beforeEach(async () => {
	NonToken = await ethers.getContractFactory('NonToken')
	token = await NonToken.deploy()
	await token.mint(ToWei(totalSupply))
})

describe('NON Token', () => {
	it('Should deploy NON Token contract successful', async () => {
		expect(token.address)
	})

	it('Should mint NON Token with correct given total supply', async () => {
		expect(await token.totalSupply()).to.equal(ToWei(totalSupply))
	})

	it('Should transfer NON Token between accounts', async () => {
		const [owner, addr1, addr2] = await ethers.getSigners()

		// Transfers 50 NON Tokens from owner to addr1
		await token.transfer(addr1.address, ToWei('50'))
		expect(await token.balanceOf(addr1.address)).to.equal(ToWei('50'))

		// Transfers 50 NON Tokens from addr1 to addr2
		await token.connect(addr1).transfer(addr2.address, ToWei('50'))
		expect(await token.balanceOf(addr1.address)).to.equal(ToWei('0'))
		expect(await token.balanceOf(addr2.address)).to.equal(ToWei('50'))
	})

	it('Should approve the transaction from Account1 to Account3 and performing by Account2', async () => {
		const [owner, addr1, addr2, addr3] = await ethers.getSigners()

		// Transfers 2000 NON Tokens from owner to addr1
		await token.transfer(addr1.address, ToWei('2000'))
		// Transfers 350 NON Tokens from owner to addr3
		await token.transfer(addr3.address, ToWei('350'))

		// Approve transaction
		await token.connect(addr1).approve(addr2.address, ToWei('1800'))

		// Transfers 1800 NON Tokens from addr1 to addr3 by addr2
		await token.connect(addr2).transferFrom(addr1.address, addr3.address, ToWei('1800'))

		expect(await token.balanceOf(addr1.address)).to.equal(ToWei('200'))
		expect(await token.balanceOf(addr2.address)).to.equal(ToWei('0'))
		expect(await token.balanceOf(addr3.address)).to.equal(ToWei('2150'))
	})
})
