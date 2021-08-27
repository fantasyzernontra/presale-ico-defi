import invariant from 'tiny-invariant'
import warning from 'tiny-warning'
import JSBI from 'jsbi'
import { getAddress } from '@ethersproject/address'

import { BigintIsh, ZERO, SolidityType, SOLIDITY_TYPE_MAXIMA } from './solidity-constant'

export function validateSolidityTypeInstance(value: JSBI, solidityType: SolidityType): void {
	invariant(JSBI.greaterThanOrEqual(value, ZERO), `${value} is not a ${solidityType}.`)
	invariant(JSBI.lessThanOrEqual(value, SOLIDITY_TYPE_MAXIMA[solidityType]), `${value} is not a ${solidityType}.`)
}

// warns if addresses are not checksummed
export function validateAndParseAddress(address: string): string {
	try {
		const checksummedAddress = getAddress(address)
		warning(address === checksummedAddress, `${address} is not checksummed.`)
		return checksummedAddress
	} catch (error) {
		invariant(false, `${address} is not a valid address.`)
	}
}

export function parseBigintIsh(bigintIsh: BigintIsh): JSBI {
	return bigintIsh instanceof JSBI
		? bigintIsh
		: typeof bigintIsh === 'bigint'
		? JSBI.BigInt(bigintIsh.toString())
		: JSBI.BigInt(bigintIsh)
}

export function sortedInsert<T>(items: T[], add: T, maxSize: number, comparator: (a: T, b: T) => number): T | null {
	invariant(maxSize > 0, 'MAX_SIZE_ZERO')
	// this is an invariant because the interface cannot return multiple removed items if items.length exceeds maxSize
	invariant(items.length <= maxSize, 'ITEMS_SIZE')

	// short circuit first item add
	if (items.length === 0) {
		items.push(add)
		return null
	} else {
		const isFull = items.length === maxSize
		// short circuit if full and the additional item does not come before the last item
		if (isFull && comparator(items[items.length - 1], add) <= 0) {
			return add
		}

		let lo = 0,
			hi = items.length

		while (lo < hi) {
			const mid = (lo + hi) >>> 1
			if (comparator(items[mid], add) <= 0) {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		items.splice(lo, 0, add)
		return isFull ? items.pop()! : null
	}
}
