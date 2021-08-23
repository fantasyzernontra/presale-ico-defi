const { BigNumber } = require('@ethersproject/bignumber')

module.exports = {
	ToWei: (value) => {
		return BigNumber.from(value).mul(BigNumber.from(String(10 ** 18)))
	},
}
