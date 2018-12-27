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
  height: 3em;
`
const FunctionButtons = styled.div`
  grid-column: 2;
  display: flex;
  justify-content: space-between;
`

const Button = styled.button`
  color: ${props => props.theme.text};
  font-family: Cairo;
  background-color: Transparent;
  border: none;
  cursor: pointer;
  font-size: 1em;
  text-decoration: none;
`

const Navbar = props => {

  const undoLast = () => {
    firebase.database().ref("state/events").orderByChild("events").limitToLast(1).once('child_added').then((snap) => {
      snap.ref.remove()
    })
  }
  const logOut = () => {
    firebase.auth().signOut().then(() => {
     
    }, (error) => error
    )
  }

  return (
    <NavbarWrapper>
      {props.authed
        ? <FunctionButtons>
          <Button onClick={props.drawerClickHandler}>Reset</Button>
          <Button onClick={undoLast} disabled={(props.eventNumber <2 )}>Undo</Button>
          <Button onClick={logOut}>Log out</Button>
        </FunctionButtons>
        : <Login />}
    </NavbarWrapper>
  )
};

Navbar.propTypes = {
  authed: PropTypes.bool.isRequired,
  eventNumber: PropTypes.number,
  drawerClickHandler: PropTypes.func.isRequired
}

Navbar.defaultProps = {
  eventNumber: 0
}

export default Navbar;
