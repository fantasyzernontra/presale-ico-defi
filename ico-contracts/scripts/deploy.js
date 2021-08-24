const { ToWei } = require('../utils/useToWei')

const TOKEN_CAP = 150000
const FUND_ADDRESS = '0x56087c947475DF3200bCB53768236D0F1d788B36'
const PRICE = ToWei(0.25)

async function main() {
	const [deployer] = await ethers.getSigners()

	console.log('Deploying contracts with the account:', deployer.address)

	const NON = await ethers.getContractFactory('NonToken')
	// Deploying NON Token
	const token = await NON.deploy()

	// Minting the initial pool.
	await token.mint(ToWei(1000000))

	const CrowedSale = await ethers.getContractFactory('CrowedSale')
	const crowedSaleContract = await CrowedSale.deploy(FUND_ADDRESS, TOKEN_CAP, PRICE)

	console.table({
		NON_TOKEN: token.address,
		CROWED_SALE: crowedSaleContract.address,
	})
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
