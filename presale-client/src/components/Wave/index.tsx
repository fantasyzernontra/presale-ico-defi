import React from 'react'
import styled, { keyframes } from 'styled-components'

const imagePath = '/assets/images/wave.svg'

const OceanContainer = styled.div`
	height: 5%;
	width: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
	background: #015871;
`

const waveAnim = () => keyframes` 
	0% {
		margin-left: 0;
	}
	100% {
		margin-left: -1600px;
	}
`

const swellAnim = () => keyframes`
	0%,
	100% {
		transform: translate3d(0, -25px, 0);
	}
	50% {
		transform: translate3d(0, 5px, 0);
	}
`

const Wave1 = styled.div`
	background: url(${imagePath}) repeat-x;
	position: absolute;
	top: -198px;
	width: 6400px;
	height: 198px;
	animation: ${waveAnim} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
	transform: translate3d(0, 0, 0);
`

const Wave2 = styled.div`
	background: url(${imagePath}) repeat-x;
	position: absolute;
	width: 6400px;
	height: 198px;
	top: -175px;
	animation: ${waveAnim} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite, ${swellAnim} 7s ease -1.25s infinite;
	opacity: 1;
	transform: translate3d(0, 0, 0);
`

const WaveBackground: React.FC = () => {
	return (
		<OceanContainer>
			<Wave1 />
			<Wave2 />
		</OceanContainer>
	)
}

export default WaveBackground
