import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BASE_BSC_SCAN_URLS } from '../config/index'
import { ChainId } from './solidity-constant'

export function isAddress(value: any): string | false {
	try {
		return getAddress(value)
	} catch {
		return false
	}
}

export function getBscScanLink(
	data: string | number,
	type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
	chainId: ChainId = ChainId.BSC_TESTNET
): string {
	switch (type) {
		case 'transaction': {
			return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`
		}
		case 'token': {
			return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`
		}
		case 'block': {
			return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`
		}
		case 'countdown': {
			return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`
		}
		default: {
			return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`
		}
	}
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
	return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
	return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
	if (!isAddress(address) || address === AddressZero) {
		throw Error(`Invalid 'address' parameter '${address}'.`)
	}

	return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}