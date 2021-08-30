require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const account = process.env.MNEMONIC

module.exports = {
	defaultNetwork: 'hardhat',
	networks: {
		testnet: {
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
			chainId: 97,
			accounts: [account],
			gas: 2100000,
		},
	},
	solidity: '0.8.0',
	paths: {
		sources: './contracts',
		test: './test',
		cache: './cache',
		artifacts: './artifacts',
	},
	mocha: {
		timeout: 20000,
	},
}
