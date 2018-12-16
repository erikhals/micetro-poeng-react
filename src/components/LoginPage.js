import React from 'react'
import * as firebase from 'firebase'
import styled from 'styled-components'

const LoginWrapper = styled.div`
  grid-column: 2;
  color: #FFFFFF;
`

const LoginPage = () => {
  const login = (event) => {
    event.preventDefault()
    const password = event.target.elements.password.value
    const email = "erikhals@gmail.com"
    firebase.auth().signInWithEmailAndPassword(email, password)
  }


  return(
  <LoginWrapper>
    <h1>Login</h1>
    <form onSubmit={login}>
    <input type="password" name="password" placeholder="Password"/>
    <button type="submit">Login</button>
    </form>
  </LoginWrapper>
)};

export default LoginPage;
