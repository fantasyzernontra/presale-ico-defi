const { ToWei } = require('../utils/useToWei')

async function main() {
	const [deployer] = await ethers.getSigners()
	const { HARDHAT_NETWORK } = process.env

	const TOKEN_CAP = HARDHAT_NETWORK === 'mainnet' ? process.env.TOKEN_CAP : '120000'
	const FUND_ADDRESS =
		HARDHAT_NETWORK === 'mainnet' ? process.env.FUND_ADDRESS : '0x56087c947475DF3200bCB53768236D0F1d788B36'
	const PRICE = HARDHAT_NETWORK === 'mainnet' ? process.env.PRICE : '0.25'

	console.log('Deploying contracts with the account:', deployer.address)
	console.log('Remaining account balance: ', (await deployer.getBalance()).toString())

	const NON = await ethers.getContractFactory('NonToken')
	// Deploying NON Token
	const token = await NON.deploy()

	const CrowedSale = await ethers.getContractFactory('CrowedSale')
	const crowedSaleContract = await CrowedSale.deploy(FUND_ADDRESS, token.address, ToWei(TOKEN_CAP), ToWei(PRICE))

	// Transfers an ownership of NON Tokens to Crowed Sale contract.
	await token.transferOwnership(crowedSaleContract.address)

	// Minting the initial pool.
	await token.mint(ToWei(TOKEN_CAP))

	// Transfers NON Tokens to Crowed Sale's balance
	await token.transfer(crowedSaleContract.address, ToWei(TOKEN_CAP))

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
