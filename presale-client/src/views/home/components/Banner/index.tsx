import React from 'react'
import Container from '../../../../components/Layout/Container'

import { devices } from '../../../../styles/Breakpoints'
import styled from 'styled-components'

const Title = styled.div`
	color: #015871;
	font-size: 28px;
	font-weight: 600;

	@media only screen and ${devices.sm} {
		font-size: 36px;
	}

	@media only screen and ${devices.md} {
		font-size: 48px;
	}

	@media only screen and ${devices.lg} {
		font-size: 72px;
	}
`

const BannerContainer = styled(Container)`
	margin-top: 50%;

	@media only screen and ${devices.sm} {
		margin-top: 25%;
	}

	@media only screen and ${devices.md} {
		margin-top: 15%;
	}
`

const Banner: React.FC = () => {
	return (
		<BannerContainer justify='center' align='center' mb={50}>
			<Title>Welcome to NON Token</Title>
			<Title>Token Pre-Sale Site</Title>
		</BannerContainer>
	)
}

export default Banner
