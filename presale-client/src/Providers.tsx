import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'

import { getLibrary } from './utils/web3React'

const helmetContext = {}

const Providers: React.FC = ({ children }) => {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<HelmetProvider context={helmetContext}>{children}</HelmetProvider>
		</Web3ReactProvider>
	)
}

export default Providers
