import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Navbar from './components/Navbar'
import PlayerNames from './components/PlayerNames'
import EventList from './components/EventList'
import NewSceneContainer from './components/NewSceneContainer'
import EliminationContainer from './components/EliminationContainer'
import LoadingDots from './components/LoadingDots'
import SideDrawer from './components/SideDrawer'
import Backdrop from './components/Backdrop'

/* eslint no-unused-expressions: 0 */

const Outer = styled.div`
  display: grid;
  margin-top: 3em;
  grid-template-columns: 1fr 2fr 1fr;
  @media(max-width: 875px){
    grid-template-columns: 10px 1fr 10px;
  }
`
const ShowEnded = styled.div`
  grid-column: 2;
  padding: 16px;
  background-color: #414141;
  color: #FFFFFF;
`

const App = (props) => {

  // declare empty components
  let loginComp
  let nameComp
  let elimComp
  let newSceneComp
  let endMessage 
  let backdrop

  // sort players
  // mount components based on sorted players
  if (props.loading === true) {
    loginComp = <LoadingDots />
  } else if (props.authed === false) {
    endMessage = ""
  } else if (props.playerData.length < 1) {
    nameComp = <PlayerNames />
  } else if (props.bench.length === 1 && props.played.length === 0) {
    endMessage = <ShowEnded>The show has ended, the winner is {props.bench[0].number}</ShowEnded>
  } else if (props.bench.length > 0) {
    newSceneComp = <NewSceneContainer key={props.eventNumber} bench={props.bench} players={props.playerData} eventNumber={props.eventNumber} />
  } else if (props.played.length > 1) {
    elimComp = <EliminationContainer players={props.played} playerPoints={props.playerPoints} eventNumber={props.roundNumber} />
  } else {
    endMessage = "Error"
  }
  if (props.sideDrawerOpen){
    backdrop = <Backdrop show={props.sideDrawerOpen} click={props.backdropClickHandler}/>
  }

  return (
    <Outer>
      <Navbar authed={props.authed} eventNumber={props.eventNumber} drawerClickHandler={props.drawerClickHandler}/>
      <SideDrawer show={props.sideDrawerOpen}/>
      {backdrop}
      {loginComp}
      {nameComp}
      <EventList events={props.eventData} playerData={props.playerData} />
      {newSceneComp}
      {elimComp}
      {endMessage}
    </Outer>
  );

}
App.propTypes = {
  eventNumber: PropTypes.number.isRequired,
  roundNumber: PropTypes.number.isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any),
  playerPoints: PropTypes.arrayOf(PropTypes.any),
  bench: PropTypes.arrayOf(PropTypes.any),
  played: PropTypes.arrayOf(PropTypes.any),
  eventData: PropTypes.arrayOf(PropTypes.any),
  authed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sideDrawerOpen: PropTypes.bool.isRequired,
  drawerClickHandler: PropTypes.func.isRequired,
  backdropClickHandler: PropTypes.func.isRequired
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
