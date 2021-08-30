import React from 'react'
import styled from 'styled-components'

import { useHistory } from 'react-router'

import Contracts from '../../../../config/constants/contracts'

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	background-color: #015871;
	width: 20%;
	padding: 35px;
	border-radius: 25px;
	padding-bottom: 20px;
`

const InfoTitle = styled.p`
	margin: 0;
	font-weight: 600;
	font-size: 24px;
	color: #fff;
`

const InfoSubHeader = styled.p`
	margin: 0;
	font-weight: 400;
	font-size: 18px;
	color: #fff;
	text-indent: 4%;
`

const InfoDetails = styled.p`
	margin: 0;
	font-size: 400;
	font-size: 14px;
	color: #b9b9b9;
	text-indent: 4%;
	cursor: pointer;
	transition: 0.3s;

	:hover {
		text-decoration: underline;
        color: #dadada;
	}
`

const PreSaleInfoBox: React.FC = () => {
	const history = useHistory()

	return (
		<InfoContainer>
			<InfoTitle>NON Token Pre-sale Info</InfoTitle>
			<InfoSubHeader>Token Address</InfoSubHeader>
			<InfoDetails onClick={() => history.push(`https://testnet.bscscan.com/token/${Contracts.nonToken[97]}`)}>
				{Contracts.nonToken[97]}
			</InfoDetails>
			<InfoSubHeader>Presale Address</InfoSubHeader>
			<InfoDetails onClick={() => history.push(`https://testnet.bscscan.com/token/${Contracts.crowedSale[97]}`)}>
				{Contracts.crowedSale[97]}
			</InfoDetails>
		</InfoContainer>
	)
}

export default PreSaleInfoBox
