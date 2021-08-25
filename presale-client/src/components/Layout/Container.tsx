import React from 'react'
import styled from 'styled-components'

const ContainerStyle = styled.div<{
	margin?: { x: string; y: string }
	padding?: { x: string; y: string }
	width?: string
	align?: string
	justify?: string
}>`
	display: flex;
	padding: 0;
	padding: ${({ padding }) => `${padding?.y} ${padding?.x}` ?? '0 0'};
	align-items: ${({ align }) => align ?? 'center'};
	justify-content: ${({ justify }) => justify ?? 'flex-start'};
	margin: ${({ margin }) => `${margin?.y} ${margin?.x}` ?? '0 0'};
`

const Container: React.FC = ({ children, ...props }) => {
	return <ContainerStyle {...props}>{children}</ContainerStyle>
}

export default Container
