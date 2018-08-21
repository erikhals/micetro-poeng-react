import React from 'react'
import * as firebase from 'firebase'
import styled from 'styled-components'

const NavbarWrapper = styled.div`
  overflow: hidden;
  background-color: #CCCCCC;
  position: fixed;
  top: 0;
  width: 100%;
  height: 35px;
`

const Navbar = () => {
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
    <button onClick={resetState}>Reset</button>
    <button onClick={undoLast}>Undo</button>
    <button onClick={logOut}>Log out</button>
  </NavbarWrapper>
  )
};

export default Navbar;
