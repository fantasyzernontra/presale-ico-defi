import { useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'
import { getCrowedSaleContract, getNonTokenContract } from '../utils/contractHelpers'

import { Contract } from '@ethersproject/contracts'
import { ChainId } from '../utils/solidity-constant'
import { WETH } from '../config/constants/token'
import { getContract } from '../utils'

export const useCrowedSale = () => {
	const { library } = useActiveWeb3React()
	return useMemo(() => getCrowedSaleContract(library.getSigner()), [library])
}

export const useNonToken = () => {
	const { library } = useActiveWeb3React()
	return useMemo(() => getNonTokenContract(library.getSigner()), [library])
}
