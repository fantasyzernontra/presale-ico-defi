const { ethers, upgrades } = require('hardhat')

async function main() {
	const [deployer] = await ethers.getSigners()
	const { HARDHAT_NETWORK } = process.envง

	const TOKEN_CAP = HARDHAT_NETWORK === 'mainnet' ? process.env.TOKEN_CAP : '120000'
	const FUND_ADDRESS =
		HARDHAT_NETWORK === 'mainnet' ? process.env.FUND_ADDRESS : '0x56087c947475DF3200bCB53768236D0F1d788B36'
	const PRICE = HARDHAT_NETWORK === 'mainnet' ? process.env.PRICE : '0.25'

	console.log('Deploying contracts with the account:', deployer.address)
	console.log('Remaing account balance: ', (await deployer.getBalance()).toString())

	// Crowed Sale and NON Token Contracts
	const CrowedSale = await ethers.getContractFactory('CrowedSale')
	const NON = await ethers.getContractFactory('NonToken')
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
