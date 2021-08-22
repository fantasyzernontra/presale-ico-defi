const { BigNumber } = require('@ethersproject/bignumber')

function ToWei(value) {
	return BigNumber.from(value).mul(BigNumber.from(String(10 ** 18)))
}

async function main() {
	const [deployer] = await ethers.getSigners()

	console.log('Deploying contracts with the account:', deployer.address)

	const NonToken = await ethers.getContractFactory('NamToken')
	const token = await NonToken.deploy()

	await token.mint(ToWei(1000000))

	console.log('Token address:', token.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
