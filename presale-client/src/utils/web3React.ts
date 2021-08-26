import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'
import { ConnectorNames } from '../config/constants/types'

const POLLING_INTERVAL = 12000
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

// Injected Connectors
export const injected = new InjectedConnector({ supportedChainIds: [CHAIN_ID] })

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
	[ConnectorNames.Injected]: injected,
}

export const getLibrary = (provider): ethers.providers.Web3Provider => {
	const library = new ethers.providers.Web3Provider(provider)
	library.pollingInterval = POLLING_INTERVAL
	return library
}
