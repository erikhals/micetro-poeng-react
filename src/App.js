import React from 'react'

import Navbar from './components/Navbar'
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
          players: {
            jkjhk: true,
            hjghgj: true
          },
          points: 4
        }
      ]
    }
  }

  playersBench() {
    // take players and run through events
    const players = this.state.players.bind(this)
    const bench = [];
    const events = this.state.events.bind(this)
    for (let i = 0, j = events.length; i < j; i += 1){
      const ilength = players.length
      for (let k = 0, l = ilength; k < l; k += 1){
        let flag = false;
        const length = events[k].players.length
        for (let m = 0, n = length; m < n; m += 1){
          if(!events[k].players[m].number === players[k].number){
            flag = true;
          }
          if(flag === true){
            bench.push(players[k])
          }
        }
      }
    }
    return bench
  }

  addPlayer(no, nm){
    const key = 0;
    const player = {number: no, name: nm, id: key}
    this.state.data.players.push(player)
  }

  addEvent(no, nm, plyrs, pnts){
    const event = {number: no, name: nm, players: plyrs, points: pnts}
    this.state.data.events.push(event)
    // recalculate scores if points
  }

  render(){
    return(
    <div>
      <Navbar/>
      <EventList events={this.state.events}/>
      <NewScene bench={this.playersBench}/>
      <Elimination/>
    </div>
    );
  }
}
export default App
