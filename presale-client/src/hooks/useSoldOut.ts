import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useCrowedSale } from './useContract'

export const useSoldOut = () => {
	const [soldOut, setSoldOut] = useState<string>('')
	const crowedSale = useCrowedSale()

	useEffect(() => {
		const fetchSoldOut = async () => {
			try {
				const res = await crowedSale.sold()
				setSoldOut(ethers.BigNumber.from(res).toString())
			} catch (err) {
				console.log(err)
			}
		}
		fetchSoldOut()
	}, [crowedSale])

	return { soldOut }
}
