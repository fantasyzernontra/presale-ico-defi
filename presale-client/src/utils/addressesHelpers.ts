import { ChainId } from './solidity-constant'
import addresses from '../config/constants/contracts'
import tokens from '../config/constants/tokens'
import { Address } from '../config/constants/types'

export const getAddress = (address: Address): string => {
	const chainId = process.env.REACT_APP_CHAIN_ID
	return address[chainId] ? address[chainId] : address[ChainId.BSC_TESTNET]
}

export const getCrowedSaleAddress = () => {
	return getAddress(addresses.crowedSale)
}

export const getNonToken = () => {
	return getAddress(tokens.non.address)
}
