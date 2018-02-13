import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'

class Elimination extends Component {
  constructor(props){
    super(props)
    this.state={
      players: props.players,
      marked: []
    }
    this.setPlayer = this.setPlayer.bind(this)
    this.submitElimination = this.submitElimination.bind(this)
    this.saveButtonActive = this.saveButtonActive.bind(this)
  }

  setPlayer(player){
    const playerindex = player.target.id
    let markedPlayers = this.state.marked
    if (player.target.checked === true){
      markedPlayers.push(playerindex)
    }else{
      markedPlayers = markedPlayers.filter(playing => playing !== playerindex)
    }
    this.setState({
      marked: markedPlayers
    })
  }

  saveButtonActive(){
    let active = true
    const marked = this.state.marked
    if (marked.length !== 0){
      active = false
    }
    return active
  }

  submitElimination(event){
    console.log("submitting")
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
    console.log("pushed")
  }

  render() {
    const benchNode = this.state.players.map((player) => {
      const pData = this.props.playerData.find(playerD => playerD.key === player)
      return (<li key={player}><input value={false} type="checkbox" name={`point${player}`} id={player} onChange={this.setPlayer}/><label htmlFor={`point${player}`}>{pData.number}. {pData.name}</label></li>)
    })

    return (
      <div>
        <div>Elimination</div>
        <form onSubmit={this.submitElimination}>
          <div>Eliminate: <ul>{benchNode}</ul></div>
          <button type="submit" disabled={this.saveButtonActive()}>Save</button>
        </form>
      </div>
    )
  }
}

Elimination.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired,
  eventNumber: PropTypes.number.isRequired
};

export default Elimination;
