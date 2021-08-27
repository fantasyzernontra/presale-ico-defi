import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useCrowedSale } from './useContract'

interface Info {
	address: string
	owner: string
	cap: number
	price: string
	isFinalized: boolean
	frozen: boolean
}

function useCrowedSaleInfo() {
	const [info, setInfo] = useState<Info>()
	const crowedSale = useCrowedSale()

	useEffect(() => {
		const fetchCrowedSaleInfo = async () => {
			try {
				const res = await crowedSale.info()

				const preprocessedData = {
					address: res.address,
					owner: res.owner,
					cap: res.cap,
					price: ethers.utils.formatEther(res.price),
					isFinalized: res.isFinalized,
					frozen: res.frozen,
				}

				setInfo(preprocessedData)
			} catch (err) {
				console.log(err)
			}
		}
		fetchCrowedSaleInfo()
	}, [crowedSale])

	return { info }
}

export default useCrowedSaleInfo
