import React from 'react'
import * as firebase from 'firebase'

const Navbar = () => {
  const resetState = () => {
    const stateRef = firebase.database().ref("state")
    stateRef.remove()
  }

  return(
  <div>
    <button onClick={resetState}>Reset</button>
  </div>
  )
};

export default Navbar;
