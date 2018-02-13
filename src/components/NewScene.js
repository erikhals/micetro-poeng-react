import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'

import PlayerChip from './PlayerChip'

class NewScene extends Component {
  constructor(props){
    super(props)
    this.state={
      bench: props.bench,
      stage: [],
      points: 0
    }
    this.setPoints = this.setPoints.bind(this)
    this.playerToStage = this.playerToStage.bind(this)
    this.playerToBench = this.playerToBench.bind(this)
    this.submitScene = this.submitScene.bind(this)
  }

  setPoints(e){
    this.setState(
      {points: e.target.value}
    )
  }
  playerToStage(playerindex){
    const fromBench = this.state.bench
    const player = fromBench.splice(playerindex, 1)[0]
    const toStage = this.state.stage
    toStage.push(player)
    toStage.sort((a,b) =>  a.number - b.number);
    this.setState({
      bench: fromBench,
      stage: toStage
    })
  }

  playerToBench(playerindex){
    const fromStage = this.state.stage
    const player = fromStage.splice(playerindex, 1)[0]
    const toBench = this.state.bench
    toBench.push(player)
    toBench.sort((a,b) =>  a.number - b.number);
    this.setState({
      bench: toBench,
      stage: fromStage
    })
  }

  submitScene(event){
    event.preventDefault()
    const sceneNumber = this.props.eventNumber
    const sceneName = event.target.elements.scenename.value
    const scenePlayers = [].concat(...this.state.stage.map(player => player.key))
    const scenePoints = Number(event.target.elements.points.value)
    const scene = {number: sceneNumber, name: sceneName, players: scenePlayers, points: scenePoints}
    const eventRef = firebase.database().ref("state/events")
    eventRef.push(scene)
  }

  render() {
    const benchNode = this.state.bench.map((player, index) => <PlayerChip key={player.number} number={player.number} name={player.name} id={index} handleSwitch={this.playerToStage}/>)
    const stageNode = this.state.stage.map((player, index) => <PlayerChip key={player.number} number={player.number} name={player.name} id={index} handleSwitch={this.playerToBench}/>)
    const pointRadios = () => {
      const radios = []
      for(let i=1; i<6; i+=1){
        radios.push(<div key={i}><input type="radio" name="points" id={`point${i}`} value={i} onChange={this.setPoints} /><label htmlFor={`point${i}`}>{i}p</label></div>)
      }
      return radios
    }
    const radios = pointRadios()
    return (
      <div>
        <div>New Scene</div>
        <form onSubmit={this.submitScene}>
          <input type="text" name="scenename" placeholder="Scenename"/>
          <div>Points: {radios}</div>
          <div>Players: {stageNode}</div>
          <div>Bench: {benchNode}</div>
          <button type="submit" disabled={!this.state.points}>Save</button>
        </form>
      </div>
    )
  }
}

NewScene.propTypes = {
  bench: PropTypes.arrayOf(PropTypes.any).isRequired,
  eventNumber: PropTypes.number.isRequired,
};

export default NewScene;
