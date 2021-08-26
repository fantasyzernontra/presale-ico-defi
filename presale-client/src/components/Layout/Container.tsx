import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
	mt?: number
	mb?: number
	ml?: number
	mr?: number
	margin?: { x: number; y: number }
	pt?: number
	pb?: number
	pl?: number
	pr?: number
	padding?: { x: number; y: number }
	flexDirec?: string
	width?: number
	align?: string
	justify?: string
	isHeightFullScreen?: boolean
}

const ContainerStyle = styled.div<ContainerProps>`
	display: flex;
	flex-direction: ${({ flexDirec }) => flexDirec ?? 'column'};
	width: ${({ width }) => width ?? '100%'};
	height: ${({ isHeightFullScreen }) => (isHeightFullScreen ? '100vh' : 'auto')};
	align-items: ${({ align }) => (align ? align : 'flex-start')};
	justify-content: ${({ justify }) => (justify ? justify : 'flex-start')};
	margin: ${({ margin }) => (margin ? `${margin?.y}px ${margin?.x}px` : '0 0')};
	margin-top: ${({ mt }) => `${mt}px` ?? '0px'};
	margin-bottom: ${({ mb }) => `${mb}px` ?? '0px'};
	margin-left: ${({ ml }) => `${ml}px` ?? '0px'};
	margin-right: ${({ mr }) => `${mr}px` ?? '0px'};
	padding: ${({ padding }) => (padding ? `${padding?.y}px ${padding?.x}px` : '0 0')};
	padding-top: ${({ pt }) => `${pt}px` ?? '0px'};
	padding-bottom: ${({ pb }) => `${pb}px` ?? '0px'};
	padding-left: ${({ pl }) => `${pl}px` ?? '0px'};
	padding-right: ${({ pr }) => `${pr}px` ?? '0px'};
`

const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
	return <ContainerStyle {...props}>{children}</ContainerStyle>
}

export default Container
