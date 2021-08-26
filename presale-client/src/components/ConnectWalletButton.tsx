import React from 'react'
import styled from 'styled-components'

import useAuth from '../hooks/useAuth'
import { useWeb3React } from '@web3-react/core'

import { ConnectorNames } from '../config/constants/types'

interface ButtonProps {
	disabled?: boolean
}

const Button = styled.div<ButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #fff;
	background-color: ${({ disabled }) => (!disabled ? '#1e797e' : '#5dced4')};
	pointer-events: ${({ disabled }) => (!disabled ? 'none' : '')};
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
}

const ConnectWalletButton: React.FC<Props> = ({ canBuyNonToken, ...props }) => {
	const { active } = useWeb3React()
	const { signin, signout } = useAuth()

	return (
		<Button
			onClick={() => {
				!active ? signin(ConnectorNames['Injected']) : signout()
			}}
			{...props}
			disabled={canBuyNonToken}
		>
			{!active ? 'Connect Wallet' : 'Enter an amount'}
		</Button>
	)
}

export default ConnectWalletButton
