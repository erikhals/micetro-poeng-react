import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  grid-column: 2;
  padding: 16px;
  background-color: #414141;
  color: #FFFFFF;
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
    background: #1F1F1F;
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
  background: teal;
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
  background: purple;
  width: 36px;
  height: 36px;
  border-radius: 50% ;
  margin: 0 5px;
`

const Elimination = (props) => {

  const benchNode = props.players.map(player => 
    (<Toggle key={player.key}><input value={false} type="checkbox" name={`point${player.key}`} id={player.key} onChange={props.markPlayer}/><label key={player.key} htmlFor={player.key}><Number>{player.number}</Number> <Name>{player.name}</Name> <Points>{player.points}</Points></label></Toggle>)
  )

  return (
    <Container>
      <div>Elimination</div>
      <form onSubmit={props.submitElimination}>
        <div>Eliminate: <List>{benchNode}</List></div>
        <button type="submit" >Save</button>
      </form>
    </Container>
  )
}

Elimination.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
  submitElimination: PropTypes.func.isRequired,
  markPlayer: PropTypes.func.isRequired
};

export default Elimination;
