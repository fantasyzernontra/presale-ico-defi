import { useEffect, useRef } from 'react'
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'ethers'

async function useTotalSupply(contract: Contract) {
	const totalSupply = useRef<string>()

	const data = await contract.totalSupply()
	totalSupply.current = ethers.utils.formatEther(data)

	return totalSupply
}

export default useTotalSupply
