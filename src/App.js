import React from 'react'

import Navbar from './components/Navbar'
import PlayerNames from './components/PlayerNames'
import EventList from './components/EventList';
import NewScene from './components/NewScene';
import Elimination from './components/Elimination'
// import LoginPage from './components/LoginPage'

window.id = 0;

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      players: [],
      events: []
    }
  }

  setPlayers(playerarr){
    console.log(playerarr)
    this.setState({
      players: playerarr
    })
  }

  addEvent(no, nm, plyrs, pnts){
    const event = {number: no, name: nm, players: plyrs, points: pnts}
    this.state.events.push(event)
    // recalculate scores if points
  }

  playersSort() {
    // take players and run through events
    const players = this.state.players
    const events = this.state.events
    const bench = []
    const played = []
    const eliminated = []
    for (let i = 0, j = players.length; i < j; i += 1){ // loop through players
      let benchflag = true
      let elimflag = false
      for (let k = 0, l = events.length; k < l; k += 1){ // loop through events
        if(!(events[k].points)){ // put all players back on bench after elimination event
          benchflag = true
        }
        for (let m = 0, n = events[k].players.length; m < n; m += 1){ // loop through players in events
          if(events[k].players[m] === players[i]){ // if players have played or in elimination, remove from bench
            benchflag = false;
            if(!(events[k].points)){ // no points indicate elimination event
              elimflag = true;
            }
          }
        }
      }
      // Sort players according to flags
      if(benchflag === true && elimflag === false){
        bench.push(players[i])
      }else if(elimflag === false){
        played.push(players[i])
      }else{
        eliminated.push(players[i])
      }
    }
    const playersSortd = []
    playersSortd.push(bench, played, eliminated)
    return playersSortd
  }

  render(){
    const playersSorted = this.playersSort()
    let nameComp = ""
    let elimComp = ""
    let newSceneComp = ""
    if (!this.state.players.length){
      nameComp = <PlayerNames players={this.state.players} setPlayers={() => this.setPlayers()}/>
    }else if (playersSorted[0]){
      newSceneComp = <NewScene bench={playersSorted[0]}/>
    }else{
      elimComp = <Elimination players={playersSorted[1]}/>
    }
    return(
    <div>
      <Navbar/>
      {nameComp}
      <EventList events={this.state.events}/>
      {newSceneComp}
      {elimComp}
    </div>
    );
  }
}
export default App
