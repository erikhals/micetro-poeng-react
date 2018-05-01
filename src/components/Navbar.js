import React from 'react'
import * as firebase from 'firebase'

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
  <div>
    <button onClick={resetState}>Reset</button>
    <button onClick={undoLast}>Undo</button>
  </div>
  )
};

export default Navbar;
