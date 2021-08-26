import React from 'react'
import styled from 'styled-components'

import useAuth from '../hooks/useAuth'
import { useWeb3React } from '@web3-react/core'

import { ConnectorNames } from '../config/constants/types'

const Button = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #fff;
	background-color: #015871;
	padding: 20;
	border-radius: 7px;
	width: 200px;
	height: 40px;
	transition: all 0.5s;
	font-weight: 400;

	:hover {
		cursor: pointer;
		background-color: #023644;
	}
`

const ConnectWalletButton = (props) => {
	const { active } = useWeb3React()
	const { signin, signout } = useAuth()

	return (
		<Button
			onClick={() => {
				!active ? signin(ConnectorNames['Injected']) : signout()
			}}
			{...props}
		>
			{!active ? 'Connect Wallet' : 'Sign Out'}
		</Button>
	)
}

export default ConnectWalletButton
