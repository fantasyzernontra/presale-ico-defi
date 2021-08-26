import { ethers } from 'ethers'

export const ToWei = (val: string) => {
	return ethers.utils.parseUnits(val)
}
