import { useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'
import { getCrowedSaleContract, getNonTokenContract } from '../utils/contractHelpers'
import { defaultProvider } from '../utils/providers'

export const useCrowedSale = () => {
	const { library } = useActiveWeb3React()
	return useMemo(
		() => getCrowedSaleContract(library.getSigner()._address ? library.getSigner() : defaultProvider),
		[library]
	)
}

export const useNonToken = () => {
	const { library } = useActiveWeb3React()
	return useMemo(
		() => getNonTokenContract(library.getSigner()._address ? library.getSigner() : defaultProvider),
		[library]
	)
}
