import React from 'react';
import * as firebase from 'firebase'
import styled from 'styled-components'

const PlayerNamesWrapper = styled.div`
  grid-column: 2;
`
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  border: none;
  border-radius: 3px;
  display: table-cell;
  width: 80%;
`
const NameListItem = styled.div`
  background: papayawhip;
  padding: 4px;
  margin: 4px;
`

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
    nameInputs.push(<NameListItem key={i}>{i}. <Input type="text" name={`playername${i}`} placeholder="Name"/></NameListItem>)
  }
  return (
    <PlayerNamesWrapper>
    <form onSubmit={submitNames}>
    {nameInputs}
    <button type="submit">Submit names</button>
    </form>
  </PlayerNamesWrapper>
  )
};

export default PlayerNames;
