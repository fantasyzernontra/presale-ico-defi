require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	networks: {
		testnet: {
			url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
			accounts: [process.env.MNEMONIC],
			gas: 2100000,
		},
	},
	solidity: '0.8.0',
}
