import { BASE_BSC_SCAN_URLS } from '../config'
import { nodes } from './getRpcUrl'

declare global {
	interface Window {
		ethereum: any
	}
}

console.log(nodes)

export const setUpNetwork = async () => {
	const provider: any = window.ethereum

	if (provider) {
		const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID!, 10)

		try {
			await provider.request({
				method: 'wallet_addEthereumChain',
				params: [
					{
						chainId: `0x${CHAIN_ID.toString(16)}`,
						chainName: 'Binance Smart Chain',
						nativeCurrency: {
							name: 'BNB',
							symbol: 'bnb',
							decimals: 18,
						},
						rpcUrls: nodes,
						blockExplorerUrls: [`${BASE_BSC_SCAN_URLS.testnet}/`],
					},
				],
			})

			return true
		} catch (err) {
			console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
			return false
		}
	}
}
