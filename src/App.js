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
  }else if (props.playerData.length < 1){
    nameComp = <PlayerNames/>
  }else if (props.bench.length > 0){
    newSceneComp = <NewScene key={props.eventNumber} bench={props.bench} players={props.playerData} eventNumber={props.eventNumber}/>
  }else{
    elimComp = <Elimination players={props.played} playerData={props.playerData} eventNumber={props.eventNumber}/>
  }

  return(
  <div>
    <Navbar/>
    {loginComp}
    {nameComp}
    <EventList events={props.eventData} playerData={props.playerData}/>
    {newSceneComp}
    {elimComp}
  </div>
  );

}
App.propTypes = {
  eventNumber: PropTypes.number.isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any),
  bench: PropTypes.arrayOf(PropTypes.any),
  played: PropTypes.arrayOf(PropTypes.any),
  eventData: PropTypes.arrayOf(PropTypes.any),
  authed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}
App.defaultProps = {
  eventData: [],
  bench: [],
  played: [],
  playerData: [],
  events: []
}
export default App
