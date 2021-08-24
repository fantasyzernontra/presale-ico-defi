const { ethers } = require('hardhat')

module.exports = {
	ToWei: (value) => {
		return ethers.utils.parseUnits(value, 18)
	},
}
