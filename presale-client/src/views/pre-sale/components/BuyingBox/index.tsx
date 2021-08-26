import React, { useState } from 'react'
import Container from '../../../../components/Layout/Container'
import InputBox from '../InputBox/index'
import ConnectWalletButton from '../../../../components/ConnectWalletButton'

import styled from 'styled-components'
import { devices } from '../../../../styles/Breakpoints'

const StyledBox = styled.div`
	display: flex;
	flex-direction: column;
	column-gap: 30px;
	background-color: #015871;
	width: 75%;
	height: 100%;
	border-radius: 25px;
	padding-bottom: 20px;

	@media only screen and ${devices.md} {
		width: 420px;
		height: 480px;
		padding-bottom: 0;
	}
`

const Title = styled.p`
	margin: 0;
	margin-top: 25px;
	padding: 0px;
	padding-left: 20px;
	font-size: 22px;
	text-align: start;
	color: #fff;
	font-weight: 600;
`

const Description = styled.p`
	margin: 0;
	padding: 5px;
	padding-left: 20px;
	margin-top: 10px;
	font-size: 14px;
	text-align: start;
	color: #fff;
	font-weight: 400;

	:nth-of-type(3) {
		margin-top: 0px;
		margin-bottom: 10px;
		color: #b9b9b9;
	}
`

const HorizontalLine = styled.div`
	width: 100%;
	height: 1px;
	background-color: #fff;
	margin-top: 5px;
	margin-bottom: 5px;
	opacity: 0.4;
`

const BuyingBox: React.FC = () => {
	const [BNB_amount, setBNBAmount] = useState<string>('')
	const [NON_amount, setNONAmount] = useState<string>('')

	return (
		<Container align='center' justify='center'>
			<StyledBox>
				<Title>Pre-sale NON TOKEN</Title>
				<Description>Buying NON Token into your wallet</Description>
				<Description>*NON Token based on Binance Smart Chain Testnet</Description>
				<HorizontalLine />
				<InputBox label='From' token_name='BNB' value={BNB_amount} onChange={setBNBAmount} />
				<InputBox label='To' token_name='NON' value={NON_amount} onChange={setNONAmount} />
				<ConnectWalletButton />
			</StyledBox>
		</Container>
	)
}

export default BuyingBox
