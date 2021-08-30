const { expect } = require('chai')

const { ToWei } = require('../utils/useToWei')

// Crowed Sale Contract
let CrowedSaleContract
let crowedSale

// NON Token Conract
let NonToken
let token

// Constant Variables
const TOKEN_CAP = '150000'
const PRICE = '0.25'

beforeEach(async () => {
	const [owner, addr1, addr2, adrr3] = await ethers.getSigners()

	NonToken = await ethers.getContractFactory('NonToken')
	token = await NonToken.deploy()

	CrowedSaleContract = await ethers.getContractFactory('CrowedSale')
	crowedSale = await CrowedSaleContract.deploy(addr1.address, token.address, ToWei(TOKEN_CAP), ToWei(PRICE))

	await token.connect

	// Transfers ownership of NON Token to Crowed Sale.
	await token.transferOwnership(crowedSale.address)
	// Mints initial pool from specified token cap.
	await token.mint(ToWei(TOKEN_CAP))
	// Transfers NON Tokens to Crowed Sale's balance
	await token.transfer(crowedSale.address, ToWei(TOKEN_CAP))
})

describe('Crowed Sale', () => {
	it('Should deploy Crowed Sale contract successful', async () => {
		expect(token.address)
		expect(crowedSale.address)
	})

	it('Should transfer from Initial pool to Crowed Sale', async () => {
		const [owner] = await ethers.getSigners()
		expect(await token.balanceOf(owner.address)).to.equal(ToWei('0'))
		expect(await token.balanceOf(crowedSale.address)).to.equal(ToWei(TOKEN_CAP))
	})

	it('Purchasing should successful and the beneficiary should recieve the exact amount of NON Token', async () => {
		const [owner, addr1, addr2] = await ethers.getSigners()
		const prov = await ethers.getDefaultProvider()
		const nativeTokenGiven = '1000'
		const tokensAmount = (parseFloat(nativeTokenGiven) / parseFloat(PRICE)).toString()

		await crowedSale.connect(addr2).purchaseToken({ value: ToWei(nativeTokenGiven) })

		const expectedRemainingInTokenCap = (parseFloat(TOKEN_CAP) - parseFloat(tokensAmount)).toString()

		const remainingBalance = await token.balanceOf(crowedSale.address)

		// Remaining NON token cap.
		expect(remainingBalance).to.equal(ToWei(expectedRemainingInTokenCap))
		// New amount of NON Token.
		expect(await token.balanceOf(addr2.address)).to.equal(ToWei(tokensAmount))

		const balance = await prov.getBalance(addr1.address)
	})
})
