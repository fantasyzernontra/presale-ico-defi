import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useNonToken } from './useContract'

function useTotalSupply() {
	const [totalSupply, setTotalSupply] = useState<string>()
	const nonToken = useNonToken()

	useEffect(() => {
		const fetchTotalSupply = async () => {
			try {
				const val = await nonToken.totalSupply()
				setTotalSupply(ethers.utils.formatEther(val))
			} catch (err) {
				console.log(err)
			}
		}
		fetchTotalSupply()
	}, [nonToken])

	return { totalSupply }
}

export default useTotalSupply
