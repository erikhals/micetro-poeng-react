import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'

import NewScene from './NewScene'

class NewSceneContainer extends Component {
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
    const sPoints = Number(e.target.value)
    this.setState(
      {points: sPoints}
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

    return (
      <NewScene
        eventNumber={this.props.eventNumber}
        bench={this.state.bench}
        stage={this.state.stage}
        points={this.state.points}
        setPoints={this.setPoints}
        playerToStage={this.playerToStage}
        playerToBench={this.playerToBench}
        submitScene={this.submitScene}
      />
    )
  }
}

NewSceneContainer.propTypes = {
  bench: PropTypes.arrayOf(PropTypes.any).isRequired,
  eventNumber: PropTypes.number.isRequired
}

export default NewSceneContainer
