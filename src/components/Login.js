import React from 'react'
import * as firebase from 'firebase'
import styled from 'styled-components'
import { ButtonStyles } from '../style'

const LoginWrapper = styled.form`
  grid-column: 2;
  display: flex;
  justify-content: center;
  color: #FFFFFF;
`
const LoginButton = styled.button`
    ${ButtonStyles}
`
const PasswordInput = styled.input`
  border-radius: 8px;
  padding: 0.5em;
  margin: 0.5em;
  border: none;
  text-decoration: none;
`

const Login = () => {
  const login = (event) => {
    event.preventDefault()
    const password = event.target.elements.password.value
    const email = "erikhals@gmail.com"
    firebase.auth().signInWithEmailAndPassword(email, password)
  }


  return (
    <LoginWrapper onSubmit={login}>
      <PasswordInput type="password" name="password" placeholder="Password" />
      <LoginButton type="submit" transparent>Login</LoginButton>
    </LoginWrapper>
  )
};

export default Login;
