import React, { Component } from "react"
import PropTypes from "prop-types"
import * as firebase from "firebase"

import Elimination from "./Elimination"

class EliminationContainer extends Component {
  state = {
    marked: []
  }

  markPlayer = player => {
    const points = player.target.getAttribute("datapoints")
    const key = player.target.id
    if (this.props.players.length > 3){         // mark players with similar score or less
      const markedPlayers = this.props.players
        .filter(item => item.points <= points)  
        .map(item => item.key)
      this.setState({
          marked: markedPlayers
        })
    } else if (player.target.checked === true){ // if less than 3 players, mark manually
        this.setState(prevState => ({
          marked: [key, ...prevState.marked]
        })) 
    } else {                                    // remove when unchecked
        this.setState(prevState => ({
          marked: [...prevState.marked.filter(playing => playing !== key)]
        }))
    }
  }

  saveButtonActive = () => {
    let active = true
    const marked = this.state.marked
    if (marked.length !== 0) {
      active = false
    }
    return active
  }

  submitElimination = event => {
    event.preventDefault()
    const elEvent = {
      number: this.props.eventNumber,
      name: "Elimination",
      points: 0,
      players: this.state.marked
    }
    const evRef = firebase.database().ref("state/events")
    evRef.push(elEvent)
  }

  continueAll = event => {
    event.preventDefault()
    const elEvent = {
      number: this.props.eventNumber,
      name: "Elimination",
      points: 0,
      players: []
    }
    const evRef = firebase.database().ref("state/events")
    evRef.push(elEvent)
  }

  render() {
    const playerData = this.props.players.map(player => {
      const isMarked = this.state.marked.includes(player.key)
      return {
        key: player.key,
        name: player.name,
        number: player.number,
        points: player.points,
        marked: isMarked
      }
    })
    const submitDisabled =
      this.state.marked.length < 1 ||
      this.state.marked.length === this.props.players.length
    return (
      <Elimination
        submitDisabled={submitDisabled}
        players={playerData}
        playerPoints={this.props.playerPoints}
        submitElimination={this.submitElimination}
        continueAll={this.continueAll}
        markPlayer={this.markPlayer}
      />
    )
  }
}

EliminationContainer.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
  playerPoints: PropTypes.arrayOf(PropTypes.any).isRequired,
  eventNumber: PropTypes.number.isRequired
}

export default EliminationContainer
