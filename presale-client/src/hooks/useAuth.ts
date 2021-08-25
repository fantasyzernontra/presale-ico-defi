import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
// import {
// 	NoEthereumProviderError,
// 	UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from '@web3-react/injected-connector'
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
					} else {
						window.localStorage.removeItem('connectorLocalStorageKey')
						// if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
						// 	toastError(t('Provider Error'), t('No provider was found'))
						// } else if (
						// 	error instanceof UserRejectedRequestErrorInjected ||
						// 	error instanceof UserRejectedRequestErrorWalletConnect
						// ) {
						// 	if (connector instanceof WalletConnectConnector) {
						// 		const walletConnector = connector as WalletConnectConnector
						// 		walletConnector.walletConnectProvider = null
						// 	}
						// 	toastError(t('Authorization Error'), t('Please authorize to access your account'))
						// } else {
						// 	toastError(error.name, error.message)
						// }
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
