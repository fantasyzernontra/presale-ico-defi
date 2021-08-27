import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { ConnectorNames } from '../config/constants/types'
import { connectorsByName } from '../utils/web3React'
import { setUpNetwork } from '../utils/wallet'

const useAuth = () => {
	const { activate, deactivate } = useWeb3React()

	const signin = useCallback(
		(connectorID: ConnectorNames) => {
			const connector = connectorsByName[connectorID]
			if (connector) {
				activate(connector, async (error: Error) => {
					if (error instanceof UnsupportedChainIdError) {
						const hasSetup = await setUpNetwork()
						if (hasSetup) {
							activate(connector)
						}
					}
				})
			}
		},
		[activate]
	)

	const signout = useCallback(() => {
		deactivate()
	}, [deactivate])

	return { signin, signout }
}

export default useAuth
