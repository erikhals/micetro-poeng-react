import React from 'react'
import * as firebase from 'firebase'

const LoginPage = () => {
  const login = (event) => {
    event.preventDefault()
    const password = event.target.elements.password.value
    const email = "erikhals@gmail.com"
    firebase.auth().signInWithEmailAndPassword(email, password)
  }


  return(
  <div>
    <h1>Login</h1>
    <form onSubmit={login}>
    <input type="text" name="password" placeholder="Password"/>
    <button type="submit">Login</button>
    </form>
  </div>
)};

export default LoginPage;
