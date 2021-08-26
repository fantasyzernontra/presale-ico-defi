import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { simpleRpcProvider } from '../utils/providers'

// Interface Types
import { Web3ReactContextInterface } from '@web3-react/core/dist/types'

const useActiveWeb3React = (): Web3ReactContextInterface<Web3Provider> => {
	const { library, chainId, ...web3React } = useWeb3React()
	const refEth = useRef(library)
	const [provider, setProvider] = useState(library || simpleRpcProvider)

	useEffect(() => {
		if (library !== refEth.current) {
			setProvider(library || simpleRpcProvider)
			refEth.current = library
		}
	}, [library])

	const CHAIN_ID: any = process.env.CHAIN_ID

	return { library: provider, chainId: chainId ?? parseInt(CHAIN_ID, 10), ...web3React }
}

export default useActiveWeb3React
