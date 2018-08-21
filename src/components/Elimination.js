import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const EliminationWrapper = styled.div`
  grid-column: 2;
  padding: 16px;
  background-color: #414141;
  color: #FFFFFF;
`

const Elimination = (props) => {

  const benchNode = props.players.map((player) => {
    const pData = props.playerData.find(playerD => playerD.key === player)
    return (<li key={player}><input value={false} type="checkbox" name={`point${player}`} id={player} onChange={props.markPlayer}/><label htmlFor={`point${player}`}>{pData.number}. {pData.name}</label></li>)
  })

  return (
    <EliminationWrapper>
      <div>Elimination</div>
      <form onSubmit={props.submitElimination}>
        <div>Eliminate: <ul>{benchNode}</ul></div>
        <button type="submit" disabled={props.submitDisabled}>Save</button>
      </form>
    </EliminationWrapper>
  )
}

Elimination.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired,
  submitDisabled: PropTypes.bool.isRequired,
  submitElimination: PropTypes.func.isRequired,
  markPlayer: PropTypes.func.isRequired
};

export default Elimination;
