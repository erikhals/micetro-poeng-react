import React from 'react'
import * as firebase from 'firebase'
import styled from 'styled-components'

const NavbarWrapper = styled.div`
  grid-column: 1/4;
  grid-row: 1;
  background-color: #CCCCCC;
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

  return(
  <NavbarWrapper>
    <button onClick={resetState}>Reset</button>
    <button onClick={undoLast}>Undo</button>
  </NavbarWrapper>
  )
};

export default Navbar;
