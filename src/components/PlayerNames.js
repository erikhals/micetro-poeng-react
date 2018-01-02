import React from 'react';

const PlayerNames = (props) => {

  const numberPlayers = 13

  const submitNames = (event) => {
    event.preventDefault()
    const playerarray = []
    for (let i = 1, j = numberPlayers + 1; i < j; i += 1 ){
      const playername = event.target.elements[`playername${i}`].value
      const player = {number: i, name: playername}
      playerarray.push(player)
    }
    console.log(playerarray)
    props.setPlayers(playerarray)
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
