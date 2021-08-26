import React, { useState, useEffect, useCallback } from 'react'
import Container from '../../../../components/Layout/Container'
import InputBox from '../InputBox/index'
import ConnectWalletButton from '../../../../components/ConnectWalletButton'

import { useWeb3React } from '@web3-react/core'
import { useCrowedSale, useNonToken } from '../../../../hooks/useContract'
import { useTokenPrice } from '../../../../hooks/useTokenPrice'
import { ethers } from 'ethers'
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
		height: 550px;
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
	font-size: 14px;
	text-align: start;
	color: #fff;
	font-weight: 400;

	:nth-of-type(2) {
		font-size: 16px;
	}

	:nth-of-type(3) {
		margin-top: 25px;
	}

	:nth-of-type(5) {
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

type Props = {
	triedEager: boolean
}

const BuyingBox: React.FC<Props> = ({ triedEager }) => {
	const crowedSale = useCrowedSale()
	const nonToken = useNonToken()
	const { account } = useWeb3React()

	const [BNB_amount, setBNBAmount] = useState<number>(NaN)
	const [NON_amount, setNONAmount] = useState<number>(NaN)
	const [totalSupply, setTotalSupply] = useState<string>('Loading...')
	const [canBuyNonToken, setCanBuyNonToken] = useState<boolean>(false)
	const [price, setPrice] = useState<string>('Loading...')
	const { bnb, non } = useTokenPrice(BNB_amount, NON_amount)

	const fetchCrowedSaleInfo = useCallback(async () => {
		const info = await crowedSale.info()
		const price = ethers.utils.formatEther(info.price)
		setPrice(price)
	}, [crowedSale])

	useEffect(() => {
		if (triedEager && nonToken && account) {
			nonToken.totalSupply().then((val) => {
				setTotalSupply(ethers.utils.formatEther(val))
			})
			fetchCrowedSaleInfo()
		}
	}, [nonToken, triedEager, fetchCrowedSaleInfo, account])

	useEffect(() => {
		if (!isNaN(BNB_amount) || !isNaN(NON_amount)) {
			setCanBuyNonToken(true)
		} else if (isNaN(BNB_amount) || isNaN(NON_amount)) setCanBuyNonToken(false)
	}, [BNB_amount, NON_amount, bnb, non])

	return (
		<Container align='center' justify='center'>
			<StyledBox>
				<Title>Pre-sale NON TOKEN</Title>
				<Description>Buying NON Token into your wallet</Description>
				<Description>Total Supply: {totalSupply}</Description>
				<Description>Price: {price}</Description>
				<Description>*NON Token based on Binance Smart Chain Testnet</Description>
				<HorizontalLine />
				<InputBox label='From' token_name='BNB' value={BNB_amount} onChange={setBNBAmount} />
				<InputBox label='To' token_name='NON' value={NON_amount} onChange={setNONAmount} />
				<ConnectWalletButton canBuyNonToken={canBuyNonToken} />
			</StyledBox>
		</Container>
	)
}

export default BuyingBox
