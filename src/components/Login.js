import React from 'react'
import * as firebase from 'firebase'
import styled from 'styled-components'

const LoginWrapper = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: center;
  color: #FFFFFF;
  > input {
    padding: 16px 16px;
    font-size: 1em;
    }
`


const Login = () => {
  const login = (event) => {
    event.preventDefault()
    const password = event.target.elements.password.value
    const email = "erikhals@gmail.com"
    firebase.auth().signInWithEmailAndPassword(email, password)
  }


  return (
    <LoginWrapper>
      <form onSubmit={login}>
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </LoginWrapper>
  )
};

export default Login;
