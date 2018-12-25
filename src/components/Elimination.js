import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ButtonStyles } from "../style"

const Container = styled.div`
  grid-column: 2;
  padding: 16px;
  background-color: #414141;
  color: #ffffff;
`
const List = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`
const Toggle = styled.div`
  display: flex;
  cursor: pointer;
  > input {
    opacity: 0;
    position: absolute;
  }
  > input + label {
    display: flex;
    flex-grow: 1;
    height: 36px;
    margin: 4px;
    background: #1f1f1f;
    cursor: pointer;
  }
  > input:checked + label {
    background: #777777;
  }
`
const Number = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.primary};
  width: 36px;
  height: 36px;
  margin: 0 5px;
`
const Name = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-grow: 1;
`
const Points = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.secondary};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0 5px;
`
const EliminationButton = styled.button`
  ${ButtonStyles};´
`
const ContinueButton = styled.button`
  ${ButtonStyles};
`

const Elimination = props => {
  const benchNode = props.players.map(player => 
    { 
      const checked = player.marked
    return (
      <Toggle key={player.key}>
      <input
        value={false}
        type="checkbox"
        name={`point${player.key}`}
        id={player.key}
        onChange={props.markPlayer}
        datapoints={player.points}
        checked={checked}
      />
      <label key={player.key} htmlFor={player.key}>
        <Number>{player.number}</Number> <Name>{player.name}</Name>{" "}
        <Points>{player.points}</Points>
      </label>
      </Toggle>)}
    )

  return (
    <Container>
      <div>Elimination</div>
      <form onSubmit={props.submitElimination}>
        <div>
          Eliminate: <List>{benchNode}</List>
        </div>
        <EliminationButton type="submit" disabled={props.submitDisabled}>Eliminate</EliminationButton>
        <ContinueButton type="reset" onClick={props.continueAll}>Continue all</ContinueButton>
      </form>
    </Container>
  )
}

Elimination.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
  submitElimination: PropTypes.func.isRequired,
  continueAll: PropTypes.func.isRequired,
  markPlayer: PropTypes.func.isRequired,
  submitDisabled: PropTypes.bool.isRequired
}

export default Elimination
