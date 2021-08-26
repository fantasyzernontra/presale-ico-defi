import React from 'react'
import Container from '../../../../components/Layout/Container'
import styled from 'styled-components'

import { devices } from '../../../../styles/Breakpoints'

const StyledBox = styled.div`
	display: flex;
	flex-direction: column;
	column-gap: 30px;
	/* padding: 35px; */
	background-color: #015871;
	width: 75%;
	height: 300px;
	border-radius: 50px;

	@media only screen and ${devices.md} {
		width: 400px;
		height: 400px;
	}
`

const Title = styled.p`
	margin: 5px 0;
	padding: 10px;
	padding-left: 20px;
	font-size: 18px;
	text-align: start;
	color: #fff;
	font-weight: 400;
`

const Description = styled.p`
	margin: 0;
	padding: 10px;
	padding-left: 20px;
	font-size: 14px;
	text-align: start;
	color: #fff;
	font-weight: 400;
`

const HorizontalLine = styled.div`
	width: 100%;
	height: 1px;
	background-color: #fff;
	margin-top: 5px;
	margin-bottom: 5px;
`

const BuyingBox: React.FC = () => {
	return (
		<Container align='center' justify='center'>
			<StyledBox>
				<Title>Pre Selling NON TOKEN</Title>
				<Description>Buying NON Token into your wallet</Description>
				<HorizontalLine />
			</StyledBox>
		</Container>
	)
}

export default BuyingBox
