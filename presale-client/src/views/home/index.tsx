import React from 'react'
import WaveBackground from '../../components/Wave'
import ConnectWalletButton from '../../components/ConnectWalletButton'

import { useWeb3React } from '@web3-react/core'
import { useEagerConnect } from '../../hooks/useEagerConnect'
import { useInactiveListener } from '../../hooks/useInactiveListener'
import { ConnectorNames } from '../../config/constants/types'

const Home: React.FC = () => {
	const { active, account } = useWeb3React()
	const triedEager = useEagerConnect()

	useInactiveListener(!triedEager)

	return (
		<>
			<WaveBackground />
			<ConnectWalletButton />
		</>
	)
}

export default Home
