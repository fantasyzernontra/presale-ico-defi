import React from 'react'
import styled from 'styled-components'

import useAuth from '../hooks/useAuth'
import useActiveWeb3React from '../hooks/useActiveWeb3React'

import { ConnectorNames } from '../config/constants/types'

interface ButtonProps {
	disabled?: boolean
}

/**
 * Active Button Cases:
 *	1) Doesn't signing in
 *	2) Enter an amount and More than or equal to 0.25
 * **/

const Button = styled.div<ButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #fff;
	background-color: ${({ disabled }) => (disabled ? '#1e797e' : '#5dced4')};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : '')};
	padding: 20;
	border-radius: 15px;
	width: 90%;
	height: 50px;
	transition: all 0.5s;
	font-weight: 600;
	font-size: 14px;
	margin: 0 auto;
	margin-top: 20px;
	border-color: transparent;

	:hover {
		cursor: pointer;
		background-color: #4ca9ad;
	}
`

type Props = {
	canBuyNonToken: boolean
	BuyingToken: () => void
}

const ConnectWalletButton: React.FC<Props> = ({ canBuyNonToken, BuyingToken, ...props }) => {
	const { active } = useActiveWeb3React()
	const { signin } = useAuth()
	const buttonStatus = active ? !canBuyNonToken : false

	return (
		<Button
			onClick={() => {
				!active ? signin(ConnectorNames['Injected']) : BuyingToken()
			}}
			{...props}
			disabled={buttonStatus}
		>
			{!active ? 'Connect Wallet' : 'Enter an amount'}
		</Button>
	)
}

export default ConnectWalletButton
