import React from 'react'
import WaveBackground from '../../components/Wave'
import Page from '../../components/Layout/Page'
import Banner from './components/Banner'
import StartButton from './components/StartButton'

import { useWeb3React } from '@web3-react/core'
import { useEagerConnect } from '../../hooks/useEagerConnect'
import { useInactiveListener } from '../../hooks/useInactiveListener'

const Home: React.FC = () => {
	const { active, account } = useWeb3React()
	const triedEager = useEagerConnect()

	useInactiveListener(!triedEager)

	return (
		<Page>
			<WaveBackground />
			<Banner />
			<StartButton />
		</Page>
	)
}

export default Home
