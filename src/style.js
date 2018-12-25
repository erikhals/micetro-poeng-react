import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Cairo');
  body{
    padding: 0;
    margin: 0;
    font-family: "Cairo", sans-serif;
    background-color: #333333;
  }
`

export const darkTheme = {
  primary: "#00838f",
  primaryLight: "#4fb3bf",
  primaryDark: "#005662",
  secondary: "#880e4f",
  secondaryLight: "#bc477b",
  secondaryDark: "#560027",
  third: "#ffc107",
  text: "#fff",
  background: "#414141",
  backgroundDark: "#1F1F1F",
  backgroundLight: "#555555"
}

export const ButtonStyles = css`
  font-family: Cairo;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: ${darkTheme.third};
  font-size: 1em;
  text-decoration: none;
`
