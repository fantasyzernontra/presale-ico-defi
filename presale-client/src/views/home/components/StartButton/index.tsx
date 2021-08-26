import React from 'react'

import { devices } from '../../../../styles/Breakpoints'
import styled from 'styled-components'

import { useHistory } from 'react-router-dom'

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
	margin: 0 auto;

	:hover {
		cursor: pointer;
		background-color: #023644;
	}

	@media only screen and ${devices.md} {
		font-size: 36px;
		width: 450px;
		height: 80px;
	}
`

const StartButton: React.FC = () => {
	const history = useHistory()

	return <Button onClick={() => history.push('/pre-sale')}>Buy NON Token</Button>
}

export default StartButton
