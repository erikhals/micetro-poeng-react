import React from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'
import styled from 'styled-components'
import Login from './Login'

const NavbarWrapper = styled.div`
  overflow: hidden;
  display: flex;
  grid-template-columns: 1fr 2fr 1fr;
  @media(max-width: 875px){
    grid-template-columns: 10px 1fr 10px;
  }
  background-color: #227B9B;
  position: fixed;
  top: 0;
  width: 100%;
  height: 35px;
`

// const ResetButton = styled.button``

const Navbar = props => {
  const resetState = () => {
    const stateRef = firebase.database().ref("state")
    stateRef.remove()
  }
  const undoLast= () => {
    firebase.database().ref("state/events").orderByChild("events").limitToLast(1).once('child_added').then((snap)=>{
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

  return(
  <NavbarWrapper>
    {props.authed 
      ? <React.Fragment>
          <button onClick={resetState}>Reset</button>
          <button onClick={undoLast}>Undo</button>
          <button onClick={logOut}>Log out</button>
        </React.Fragment>
      : <Login/>}
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
