import { ethers } from 'ethers'
import { simpleRpcProvider } from './providers'

// Addresses
import { getAddress, getCrowedSaleAddress, getNonToken } from './addressesHelpers'

// ABI
import crowedSaleABI from '../config/abi/CrowedSale.json'
import nonABI from '../config/abi/NonToken.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
	const signerOrProvider = signer ?? simpleRpcProvider
	return new ethers.Contract(address, abi, signerOrProvider)
}

export const getCrowedSaleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(crowedSaleABI, getCrowedSaleAddress(), signer)
}

export const getNonTokenContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
	return getContract(nonABI, getNonToken(), signer)
}
