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
      players: [
        "jkjhk":{
          name: "Jonas",
          number: 1
        },
        "hjghgj": {
          name: "Paul",
          number: 2
        }
      ],
      events: [
        {
          name: "Første",
          number: 1,
          players: [
            "jkjhk"
          ],
          points: 4
        },
        {
          name: "Andre",
          number: 2,
          players: [
            "hjghgj"
          ],
          points: 4
        },
        {
          number: 3,
          players: [
            "hjghgj"
          ]
        },
        {
          name: "Fjerde",
          number: 4,
          players: [
            "jkjhk"
          ],
          points: 4
        }

      ]
    }
  }

  playersSort() {
    // take players and run through events
    const players = this.state.players
    const events = this.state.events
    const bench = []
    const played = []
    const eliminated = []
    for (let i = 0, j = players.length; i < j; i += 1){
      const elength = events.length
      let benchflag = true
      let elimflag = false
      let lastroundflag = true
      for (let k = 0, l = elength; k < l; k += 1){
        const plength = events[k].players.length
        if (lastroundflag === false){
          lastroundflag = true
        }
        if(!(events[k].points)){
          lastroundflag = false
          benchflag = true
        }
        for (let m = 0, n = plength; m < n; m += 1){
          if(events[k].players[m] === players[i]){
            benchflag = false;
            if(!(events[k].points)){
              elimflag = true;
            }
          }
        }
      }
      if(benchflag === true && elimflag === false){
        bench.push(players[i])
      }else if(elimflag === false){
        played.push(players[i])
      }else{
        eliminated.push(players[i])
      }
    }
    const playersSorted = []
    playersSorted.push(bench, played, eliminated)
    return playersSorted
  }

  addPlayer(no, nm){
    const key = 0;
    const player = {number: no, name: nm, id: key}
    this.state.players.push(player)
  }

  addEvent(no, nm, plyrs, pnts){
    const event = {number: no, name: nm, players: plyrs, points: pnts}
    this.state.events.push(event)
    // recalculate scores if points
  }

  render(){
    const playersSorted = this.playersSort()
    let nameComp = ""
    let elimComp = ""
    let newSceneComp = ""
    if (!this.state.players){
      nameComp = <PlayerNames/>
    }
    if (playersSorted[0]){
      newSceneComp = <NewScene bench={playersSorted[0]}/>
    }
    if (!playersSorted[0]){
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
