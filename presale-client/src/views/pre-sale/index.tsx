import React from 'react'
import Page from '../../components/Layout/Page'
import Container from '../../components/Layout/Container'
import BuyingBox from './components/BuyingBox'

const PreSell: React.FC = () => {
	return (
		<Page>
			<Container align='center' justify='center' isHeightFullScreen>
				<BuyingBox />
			</Container>
		</Page>
	)
}

export default PreSell
