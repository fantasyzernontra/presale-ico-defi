import React from 'react'
import Container from './Container'

import styled from 'styled-components'

import { devices } from '../../styles/Breakpoints'

const StyledPage = styled(Container)`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: '100%';
	overflow: hidden;
	align-items: flex-start;
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
	return (
		<>
			<StyledPage {...props} isHeightFullScreen>
				{children}
			</StyledPage>
		</>
	)
}

export default Page
