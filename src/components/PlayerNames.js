import React from 'react';
import * as firebase from 'firebase'
import styled from 'styled-components'

import {ButtonStyles} from '../style'

const PlayerNamesWrapper = styled.form`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #FFFFFF;
  > * { 
    &:first-child {
      margin-top: 1em;
    }
  }  
`
const NameListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2em;
`
const PlayerNumber = styled.div`
  background: ${props => props.theme.primary};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin: 0 0.5em 0 0;
`
const Input = styled.input`
  flex-grow: 1;
  font-size: 1em;
  padding: 0.5em;
  margin: 0.5em;
  border: none;
  border-radius: 3px;
`
const SubmitButton = styled.button`
  ${ButtonStyles}
  margin: 1em 1em 4em 1em;
`


const PlayerNames = () => {

  const numberPlayers = 13

  const submitNames = (event) => {
    event.preventDefault()
    const dbref = firebase.database().ref("state/players")
    for (let i = 1, j = numberPlayers + 1; i < j; i += 1) {
      const playername = event.target.elements[`playername${i}`].value
      const player = { number: i, name: playername }
      if (playername){
        dbref.push(player)
      } 
    }
  }

  const nameInputs = []

  for (let i = 1, j = numberPlayers + 1; i < j; i += 1) {
    nameInputs.push(<NameListItem key={i}>
      <PlayerNumber>{i}.</PlayerNumber> 
      <Input type="text" name={`playername${i}`} placeholder="Name" maxLength="16" />
      </NameListItem>)
  }
  return (
    <PlayerNamesWrapper onSubmit={submitNames}>
        {nameInputs}
        <SubmitButton type="submit">Submit names</SubmitButton>
    </PlayerNamesWrapper>
  )
};

export default PlayerNames;
