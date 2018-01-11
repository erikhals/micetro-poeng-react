import React from 'react'
import PropTypes from 'prop-types'

const LoginPage = (props) => {
  const login = (event) => {
    event.preventDefault()
    const password = event.target.elements.password.value
    props.login(password)
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

LoginPage.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginPage;
