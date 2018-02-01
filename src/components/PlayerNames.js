import React from 'react';
import * as firebase from 'firebase'

const PlayerNames = () => {

  const numberPlayers = 13

  const submitNames = (event) => {
    event.preventDefault()
    const dbref = firebase.database().ref("state/players")
    for (let i = 1, j = numberPlayers + 1; i < j; i += 1 ){
      const playername = event.target.elements[`playername${i}`].value
      const player = {number: i, name: playername}
      dbref.push(player)
    }
  }

  const nameInputs = []

  for (let i = 1, j = numberPlayers + 1; i < j; i += 1){
    nameInputs.push(<div key={i}>{i}. <input type="text" name={`playername${i}`} placeholder="Name"/></div>)
  }
  return (
    <div>
    <form onSubmit={submitNames}>
    {nameInputs}
    <button type="submit">Submit names</button>
    </form>
    </div>
  )
};

export default PlayerNames;
