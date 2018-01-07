import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Elimination extends Component {
  constructor(props){
    super(props)
    this.state={
      players: props.players,
    }
    this.setPlayer = this.setPlayer.bind(this)
    this.submitElimination = this.submitElimination.bind(this)
  }

  setPlayer(e){
    const playerindex = e.target.id
    const playerarray = this.state.players
    console.log(e.target.checked)
    if (e.target.checked === true){
      playerarray[playerindex].marked = true
    }else{
      playerarray[playerindex].marked = false
    }
    console.log(playerarray)
    this.setState({
      players: playerarray
    })
  }

  submitElimination(event){
    event.preventDefault()
    const no = this.props.eventNumber
    const nm = "Elimination"
    const plyrs = this.state.marked
    const pnts = 0
    this.props.addScene(no, nm, plyrs, pnts)
  }

  render() {
    const benchNode = this.state.players.map((player, index) => <input key={player.number} value={false} type="checkbox" name={player.name} id={index} onChange={this.setPlayer}/>)

    return (
      <div>
        <div>Elimination</div>
        <form onSubmit={this.submitElimination}>
          <input type="text" name="scenename" placeholder="Scenename"/>
          <div>Eliminate: {benchNode}</div>
          <button type="submit" disabled={!this.state.points}>Save</button>
        </form>
      </div>
    )
  }
}

Elimination.propTypes = {
  players: PropTypes.arrayOf(PropTypes.any).isRequired,
  eventNumber: PropTypes.number.isRequired,
  addScene: PropTypes.func.isRequired
};

export default Elimination;
