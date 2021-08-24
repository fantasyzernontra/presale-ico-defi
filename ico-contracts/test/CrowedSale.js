const { expect } = require('chai')

// Crowed Sale Contract
let CrowedSaleContract
let crowedSale

// Constant Variables
const FUND_ADDRESS = '0x56087c947475DF3200bCB53768236D0F1d788B36'
const TOKEN_CAP = '150000'
const PRICE = '0.25'

beforeEach(async () => {
	CrowedSaleContract = await ethers.getContractFactory('CrowedSale')
	crowedSale = await CrowedSaleContract.deploy(
		FUND_ADDRESS,
		ethers.utils.parseUnits(TOKEN_CAP, 18),
		ethers.utils.parseUnits(PRICE, 18)
	)
})

describe('Crowed Sale', () => {
	it('Should deploy Crowed Sale contract successful', async () => {
		expect(crowedSale.address)
	})

	// it('', async () => {})
})
