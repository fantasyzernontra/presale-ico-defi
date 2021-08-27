import React, { useState, useEffect } from 'react'
import Container from '../../../../components/Layout/Container'
import InputBox from '../InputBox/index'
import ConnectWalletButton from '../../../../components/ConnectWalletButton'
import Spinner from '../../../../components/Loader/Spinner'

import styled from 'styled-components'
import { devices } from '../../../../styles/Breakpoints'
import { ethers } from 'ethers'

import useActiveWeb3React from '../../../../hooks/useActiveWeb3React'
import { useCrowedSale } from '../../../../hooks/useContract'
import { useTokenPrice } from '../../../../hooks/useTokenPrice'
import { useSoldOut } from '../../../../hooks/useSoldOut'
import useTotalSupply from '../../../../hooks/useTotalSupply'
import useCrowedSaleInfo from '../../../../hooks/useCrowedSale'

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
		height: 580px;
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

	:nth-of-type(6) {
		margin-top: 0px;
		margin-bottom: 10px;
		color: #b9b9b9;
	}
`

const Warning = styled.p`
	line-height: 15px;
	margin: 0;
	padding-left: 50px;
	font-size: 14px;
	text-align: start;
	color: #f65f5f;
	font-weight: 400;
	height: 10px;
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
	const { library } = useActiveWeb3React()
	const { totalSupply } = useTotalSupply()
	const { info } = useCrowedSaleInfo()
	const { soldOut } = useSoldOut()
	const crowedSale = useCrowedSale()

	const [BNB_amount, setBNBAmount] = useState<string>('')
	const [NON_amount, setNONAmount] = useState<string>('')
	const [canBuyNonToken, setCanBuyNonToken] = useState<boolean>(false)
	const [hasEverPassTheCondition, setHasEverPassTheCondition] = useState<boolean>(false)
	const [isPending, setIsPending] = useState<boolean>(false)
	const { non } = useTokenPrice(BNB_amount)

	const BuyingToken = async () => {
		setIsPending(true)
		try {
			await crowedSale.connect(library.getSigner()).purchaseToken({
				gasLimit: 210000,
				value: ethers.utils.parseUnits(BNB_amount),
			})
		} catch (err) {
			console.log(err)
		}
		setIsPending(false)
		window.location.reload()
	}

	useEffect(() => {
		setNONAmount(non)
	}, [non])

	// Exchanging Validation
	useEffect(() => {
		if (parseFloat(BNB_amount) >= 0.25) {
			setCanBuyNonToken(true)
			setHasEverPassTheCondition(true)
		} else if (BNB_amount === '' || isNaN(parseFloat(BNB_amount)) || parseFloat(BNB_amount) < 0.25)
			setCanBuyNonToken(false)

		return () => {}
	}, [BNB_amount])

	if (isPending) return <Spinner />

	return (
		<Container align='center' justify='center'>
			<StyledBox>
				<Title>Pre-sale NON TOKEN</Title>
				<Description>Buying NON Token into your wallet</Description>
				<Description>Total Supply: {totalSupply ?? 'Loading...'}</Description>
				<Description>Price: {info ? info.price + ' BNB for 1 NON' : 'Loading...'}</Description>
				<Description>Sold Out: {soldOut ? soldOut + ' NON TOKEN' : 'Loading...'}</Description>
				<Description>*NON Token based on Binance Smart Chain Testnet</Description>
				<HorizontalLine />
				<InputBox label='From' token_name='BNB' value={BNB_amount} onChange={setBNBAmount} />
				<InputBox label='To' token_name='NON' value={NON_amount} readOnly />
				<Warning>
					{hasEverPassTheCondition && !canBuyNonToken && info ? `Enter the amount at least ${info.price} BNB` : ''}
				</Warning>
				<ConnectWalletButton canBuyNonToken={canBuyNonToken} BuyingToken={BuyingToken} />
			</StyledBox>
		</Container>
	)
}

export default BuyingBox
