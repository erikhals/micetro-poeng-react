import React from 'react'

import Navbar from './components/Navbar'
import PlayerNames from './components/PlayerNames'
import EventList from './components/EventList'
import NewScene from './components/NewScene'
import Elimination from './components/Elimination'
// import LoginPage from './components/LoginPage'

window.id = 0;

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      players: [],
      events: [],
      newSceneMounted: true
    }
    this.setPlayers = this.setPlayers.bind(this)
    this.addEvent = this.addEvent.bind(this)
  }

  setPlayers(playerarr){
    this.setState({
      players: playerarr
    })
  }

  addEvent(no, nm, plyrs, pnts){
    const event = {number: no, name: nm, players: plyrs, points: pnts}
    const eventarr = this.state.events
    eventarr.push(event)
    this.setState({
      events: eventarr,
      newSceneMounted: false
    })
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
    const playersSortd = [] // create sorted array of arrays
    playersSortd.push(bench, played, eliminated)
    return playersSortd
  }

  render(){
    // declare empty components
    let nameComp = ""
    let elimComp = ""
    let newSceneComp = ""

    const eventNumber = this.state.events.length + 1
    // sort players
    const playersSorted = this.playersSort()
    // mount components based on sorted players
    if (this.state.players.length < 1){
      nameComp = <PlayerNames players={this.state.players} setPlayers={this.setPlayers}/>
    }else if (playersSorted[0].length > 0){
      newSceneComp = <NewScene key={eventNumber} bench={playersSorted[0]} eventNumber={eventNumber} addScene={this.addEvent}/>
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
