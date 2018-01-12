import React from 'react'

import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import PlayerNames from './components/PlayerNames'
import EventList from './components/EventList'
import NewScene from './components/NewScene'
import Elimination from './components/Elimination'
// import LoginPage from './components/LoginPage'

const App = (props) => {

  const playersSort = () => {
    // take players and run through events
    const players = props.players
    const events = props.events
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


    // declare empty components
    let loginComp = ""
    let nameComp = ""
    let elimComp = ""
    let newSceneComp = ""


    // sort players
    // mount components based on sorted players
    if(props.authed === false){
      loginComp = <LoginPage/>
    }else if (props.players.length < 1){
      nameComp = <PlayerNames players={props.players}/>
    }else if (playersSort[0].length > 0){
      newSceneComp = <NewScene key={props.eventNumber} bench={playersSort[0]} eventNumber={props.eventNumber}/>
    }else{
      elimComp = <Elimination players={playersSort[1]} eventNumber={props.eventNumber}/>
    }

    return(
    <div>
      <Navbar/>
      {loginComp}
      {nameComp}
      <EventList events={props.events}/>
      {newSceneComp}
      {elimComp}
    </div>
    );

}
export default App
