import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import PlayerChip from './PlayerChip'

const NewSceneWrapper = styled.div`
  grid-column: 2;
  padding: 16px;
  background-color: #eeeeee;
`
const PointsWrapper = styled.div`
  
`

const NewScene = (props) => {

  const benchNode = props.bench.map((player, index) => <PlayerChip key={player.number} number={player.number} name={player.name} id={index} handleSwitch={props.playerToStage}/>)
  const stageNode = props.stage.map((player, index) => <PlayerChip key={player.number} number={player.number} name={player.name} id={index} handleSwitch={props.playerToBench}/>)
  const pointRadios = () => {
    const radios = []
    for(let i=1; i<6; i+=1){
      radios.push(<div key={i}><input type="radio" name="points" id={`point${i}`} value={i} onChange={props.setPoints} /> <label htmlFor={`point${i}`}>{i}p</label> </div>)
    }
    return radios
  }

  return (
    <NewSceneWrapper>
      <div>New Scene</div>
      <form onSubmit={props.submitScene}>
        <input type="text" name="scenename" placeholder="Scenename"/>
        <PointsWrapper>Points: {pointRadios()}</PointsWrapper>
        <div>Players: {stageNode}</div>
        <button type="submit" disabled={(props.points < 1 || props.stage.length < 1)}>Save</button>
        <div>Bench: {benchNode}</div>
      </form>
    </NewSceneWrapper>
  )
}

NewScene.propTypes = {
  bench: PropTypes.arrayOf(PropTypes.any).isRequired,
  stage: PropTypes.arrayOf(PropTypes.any),
  points: PropTypes.number.isRequired,
  playerToBench: PropTypes.func.isRequired,
  playerToStage: PropTypes.func.isRequired,
  setPoints: PropTypes.func.isRequired,
  submitScene: PropTypes.func.isRequired
}

NewScene.defaultProps = {
  stage: [],
}

export default NewScene
