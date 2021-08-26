import React from 'react'
import Page from '../../components/Layout/Page'
import Container from '../../components/Layout/Container'
import BuyingBox from './components/BuyingBox'

import { useEagerConnect } from '../../hooks/useEagerConnect'
import { useInactiveListener } from '../../hooks/useInactiveListener'

const PreSell: React.FC = () => {
	const triedEager = useEagerConnect()

	useInactiveListener(!triedEager)

	return (
		<Page>
			<Container align='center' justify='center' isHeightFullScreen>
				<BuyingBox triedEager={triedEager} />
			</Container>
		</Page>
	)
}

export default PreSell
