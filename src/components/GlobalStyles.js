import styled, {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Cairo');
  body{
    padding: 0;
    margin: 0;
    font-family: "Cairo", sans-serif;
    background-color: #333333;
  }
`

export const theme = {
    primary: "#227B9B"
}
