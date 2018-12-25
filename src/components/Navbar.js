import React from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'
import styled from 'styled-components'
import Login from './Login'

const NavbarWrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  @media(max-width: 875px){
    grid-template-columns: 10px 1fr 10px;
  }
  background-color: ${props => props.theme.primary};
  position: fixed;
  top: 0;
  width: 100%;
  height: 35px;
`
const FunctionButtons = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  color: #fff;
  font-family: Cairo;
  background-color: Transparent;
  border: none;
  cursor: pointer;
  font-size: 1em;
  text-decoration: none;
`
const RightButton = styled(Button)`
  
`

const Navbar = props => {
  const resetState = () => {
    const stateRef = firebase.database().ref("state")
    stateRef.remove()
  }
  const undoLast = () => {
    firebase.database().ref("state/events").orderByChild("events").limitToLast(1).once('child_added').then((snap) => {
      snap.ref.remove()
    })
  }
  const logOut = () => {
    firebase.auth().signOut().then(() => {
      console.log("signed out")
    }, (error) => {
      console.log("error signing out", error)
    })
  }

  return (
    <NavbarWrapper>
      {props.authed
        ? <FunctionButtons>
          <Button onClick={resetState}>Reset</Button>
          <Button onClick={undoLast}>Undo</Button>
          <RightButton onClick={logOut}>Log out</RightButton>
        </FunctionButtons>
        : <Login />}
    </NavbarWrapper>
  )
};

Navbar.propTypes = {
  authed: PropTypes.bool
}

Navbar.defaultProps = {
  authed: false,
}

export default Navbar;
