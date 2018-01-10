import React from 'react'
import PropTypes from 'prop-types'

const LoginPage = (props) => {
  const login = (event) => {
    event.preventDefault()
    const password = event.target.value
    props.login(password)
  }
  return(
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Password"/>
    <button onClick={login}>Login</button>
  </div>
)};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginPage;
