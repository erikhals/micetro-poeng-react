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
  const eventslist = props.events

  const lastround = eventslist.slice(eventslist.findIndex(k => k.points === 0) + 1)
  const played = [].concat(...lastround.map(e => e.players))
  const eliminations = eventslist.filter(e => e.points === 0)
  const eliminated = [].concat(...eliminations.map(e => e.players))
  const rplyrs = playerslist.filter(function(e) {return this.indexOf(e)<0}, eliminated)
  const bench = rplyrs.filter(
    (player) => {
      console.log('played', played);
      return played.indexOf(player) < 0;
    }
  )

  const playersSort = {
    bench: bench,
    played: played,
    eliminated: eliminated,
  }
  //playersSort.push(bench, played, eliminated)

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
  }else if (playersSort.bench.length > 0){
    newSceneComp = <NewScene key={props.eventNumber} bench={playersSort.bench} eventNumber={props.eventNumber}/>
  }else{
    elimComp = <Elimination players={playersSort.played} eventNumber={props.eventNumber}/>
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
