import React from 'react'
import PropTypes from 'prop-types'
import styled, { injectGlobal } from 'styled-components'

import Navbar from './components/Navbar'
import LoginPage from './components/LoginPage'
import PlayerNames from './components/PlayerNames'
import EventList from './components/EventList'
import NewSceneContainer from './components/NewSceneContainer'
import EliminationContainer from './components/EliminationContainer'
// import LoginPage from './components/LoginPage'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Cairo');
  body{
    padding: 0;
    margin: 0;
    font-family: "Cairo", sans-serif;
  }
`

const Outer = styled.div`
  display: grid;
  margin-top: 35px;
  grid-template-columns: 1fr 2fr 1fr;
  @media(max-width: 875px){
    grid-template-columns: 10px 1fr 10px;
  }
`

const App = (props) => {

  // declare empty components
  let loginComp = ""
  let nameComp = ""
  let elimComp = ""
  let newSceneComp = ""
  let endMessage = ""

  // sort players
  // mount components based on sorted players
  if(props.loading === true){
    loginComp = <div>Loading</div>
  }else if(props.authed === false){
    loginComp = <LoginPage/>
  }else if (props.playerData.length < 1){
    nameComp = <PlayerNames/>
  }else if (props.bench.length === 1 && props.played.length === 0){
    endMessage = `The show has ended, the winner is ${props.bench[0].number}`
  }else if (props.bench.length > 0){
    newSceneComp = <NewSceneContainer key={props.eventNumber} bench={props.bench} players={props.playerData} eventNumber={props.eventNumber}/>
  }else if (props.played.length > 1){
    elimComp = <EliminationContainer players={props.played} playerData={props.playerData} playerPoints={props.playerPoints} eventNumber={props.eventNumber}/>
  }else{
    endMessage = "Error"
  }

  return(
  <Outer>
    <Navbar/>
    {loginComp}
    {nameComp}
    <EventList events={props.eventData} playerData={props.playerData}/>
    {newSceneComp}
    {elimComp}
    {endMessage}
  </Outer>
  );

}
App.propTypes = {
  eventNumber: PropTypes.number.isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any),
  playerPoints: PropTypes.arrayOf(PropTypes.any),
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
  playerPoints: [],
  events: []
}
export default App
