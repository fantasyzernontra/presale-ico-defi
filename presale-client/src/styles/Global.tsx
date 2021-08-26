import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    * {
        font-family: 'Montserrat', sans-serif;
    }

    html, body {
        margin: 0;
        height: auto;
        overflow: hidden;
    }

    body {
        background:radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%) no-repeat;
    }

`

export default GlobalStyle
