import React, { SetStateAction, Dispatch } from 'react'
import Container from '../../../../components/Layout/Container'
import styled from 'styled-components'

import { devices } from '../../../../styles/Breakpoints'

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	column-gap: 10px;
	padding: 20px;
	border-radius: 25px;
	background-color: #0280a3;
	width: 80%;
	margin: 15px auto;
`

const Label = styled.h3`
	margin: 0;
	font-weight: 400;
	color: #fff;
	font-size: 14px;
`

const TokenLabel = styled.p`
	margin: 0;
	font-weight: 600;
	color: #c0c0c0;
	font-size: 14px;
`

const Input = styled.input`
	background-color: transparent;
	border: 0;
	font-size: 14px;
	outline: none;
	margin-top: 10px;
	caret-color: #fff;
	color: #b9b9b9;
	width: 90%;
	height: auto;

	::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	[type='number'] {
		-moz-appearance: textfield;
	}

	::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #b9b9b9;
		opacity: 1; /* Firefox */
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10-11 */
		color: #b9b9b9;
	}

	::-ms-input-placeholder {
		/* Microsoft Edge */
		color: #b9b9b9;
	}
`

type Props = {
	label: string
	token_name: string
	value: number
	onChange: Dispatch<SetStateAction<number>>
}

const InputBox: React.FC<Props> = ({ label, token_name, value, onChange }: Props) => {
	return (
		<InputContainer>
			<Label>{label}</Label>
			<Container flexDirec='row' align='flex-end' justify='center'>
				<Input type='number' placeholder='0.0' value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
				<TokenLabel>{token_name}</TokenLabel>
			</Container>
		</InputContainer>
	)
}

export default InputBox
