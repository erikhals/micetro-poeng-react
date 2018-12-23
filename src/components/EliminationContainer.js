import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'

import Elimination from './Elimination'

class EliminationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marked: []
    }
  }

  markPlayer = (player) => {
    const playerindex = player.target.id
    let markedPlayers = this.state.marked
    if (player.target.checked === true) {
      markedPlayers.push(playerindex)
    } else {
      markedPlayers = markedPlayers.filter(playing => playing !== playerindex)
    }
    this.setState({
      marked: markedPlayers
    })
  }

  saveButtonActive = () => {
    let active = true
    const marked = this.state.marked
    if (marked.length !== 0) {
      active = false
    }
    return active
  }

  submitElimination = (event) => {
    event.preventDefault()
    const no = this.props.eventNumber
    const nm = "Elimination"
    const markedplyrs = this.state.marked
    const pnts = 0
    const elEvent = {
      "number": no,
      "name": nm,
      "points": pnts,
      "players": markedplyrs
    }
    const evRef = firebase.database().ref("state/events")
    evRef.push(elEvent)
  }

  render() {
    // const submitDisabled = this.state.marked.length < 1 || this.state.marked.length === this.props.players.length
    return (
      <Elimination
        // submitDisabled={submitDisabled}
        players={this.props.players}
        playerData={this.props.playerData}
        playerPoints={this.props.playerPoints}
        submitElimination={this.submitElimination}
        markPlayer={this.markPlayer}
      />
    )
  }
}

EliminationContainer.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired,
  playerPoints: PropTypes.arrayOf(PropTypes.any).isRequired,
  eventNumber: PropTypes.number.isRequired

};

export default EliminationContainer;
