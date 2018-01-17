import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as firebase from 'firebase'

class Elimination extends Component {
  constructor(props){
    super(props)
    this.state={
      players: props.players
    }
    this.setPlayer = this.setPlayer.bind(this)
    this.submitElimination = this.submitElimination.bind(this)
    this.saveButtonActive = this.saveButtonActive.bind(this)
  }

  setPlayer(e){
    const playerindex = e.target.id
    const playerarray = this.state.players
    if (e.target.checked === true){
      playerarray[playerindex].marked = true
    }else{
      playerarray[playerindex].marked = false
    }
    this.setState({
      players: playerarray
    })
  }

  saveButtonActive(){
    let active = true
    const plyrs = this.state.players
    for (let i = 0, j = plyrs.length; i < j; i+=1){
      if (plyrs[i].marked === true){
        active = false
      }
    }
    return active
  }

  submitElimination(event){
    event.preventDefault()
    const no = this.props.eventNumber
    const nm = "Elimination"
    const plyrs = this.state.players
    const markedplyrs = []
    const pnts = 0
    for(let i=0, j=plyrs.length; i<j; i+=1){
      if(plyrs[i].marked === true){
        delete plyrs[i].marked
        markedplyrs.push(plyrs[i])
      }
    }
    const elEvent = {
      "Number": no,
      "Name": nm,
      "Points": pnts,
      "Players": markedplyrs
    }
    const evRef = firebase.database().ref("events")
    evRef.push(elEvent)
  }

  render() {
    const benchNode = this.state.players.map((player, index) => <li key={player.number}><input value={false} type="checkbox" name={`point${player.number}`} id={index} onChange={this.setPlayer}/><label htmlFor={`point${player.number}`}>{player.number}. {player.name}</label></li>)

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
  eventNumber: PropTypes.number.isRequired,
};

export default Elimination;
