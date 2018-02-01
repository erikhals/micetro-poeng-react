import React from 'react'
import PropTypes from 'prop-types'

import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import PlayerNames from './components/PlayerNames'
import EventList from './components/EventList'
import NewScene from './components/NewScene'
import Elimination from './components/Elimination'
// import LoginPage from './components/LoginPage'

const App = (props) => {
  const playerslist = props.players
  const playersarr = []
  for (let i=0; i<props.players.length; i+=1){
    playerslist.push(props.players[i].number)
  }
  const eventslist = props.events

  const lastround = eventslist.slice(eventslist.findIndex(event => event.points === 0) + 1)
  const played = [].concat(...lastround.map(event => event.players))
  const eliminations = eventslist.filter(event => event.points === 0)
  const eliminated = [].concat(...eliminations.map(event => event.players))
  const roundplayers = playersarr.filter(player =>  eliminated.indexOf(player) === -1)
  const bench = roundplayers.filter(player => played.indexOf(player) === -1)
  console.log("roundplayers", roundplayers)
  console.log("played", played)
  console.log("bench", bench)
  // declare empty components
  let loginComp = ""
  let nameComp = ""
  let elimComp = ""
  let newSceneComp = ""

  // sort players
  // mount components based on sorted players
  if(props.loading === true){
    loginComp = <div>Loading</div>
  }else if(props.authed === false){
    loginComp = <LoginPage/>
  }else if (props.players.length < 1){
    nameComp = <PlayerNames/>
  }else if (bench.length > 0){
    newSceneComp = <NewScene key={props.eventNumber} bench={bench} players={props.players} eventNumber={props.eventNumber}/>
  }else{
    elimComp = <Elimination players={played} eventNumber={props.eventNumber}/>
  }

  console.log('newSceneComp', newSceneComp);

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
App.propTypes = {
  eventNumber: PropTypes.number.isRequired,
  players: PropTypes.arrayOf(PropTypes.any),
  events: PropTypes.arrayOf(PropTypes.any),
  authed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}
App.defaultProps = {
  players: [],
  events: []
}
export default App
