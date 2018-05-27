import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerChip from './PlayerChip'

const EventWrapper = styled.li`
  color: F5F5F5;
  padding: 16px;
`
const SceneName = styled.div`
  float: left;
`
const ScenePoints = styled.div`
  float: right;
`

const PlayerList = styled.ul`
  list-style: none;
  padding-left: 0px;
  clear: left;
  display: flex;
`

const Event = (props) => {
  const number = props.event.number
  const name = props.event.name
  const players = props.event.players.map(player => {
    const pData = props.playerData.find(playerD => playerD.key === player)
    return(<PlayerChip key={player} id={pData.number} number={pData.number} name={pData.name}/>)})
return(
  <EventWrapper>
    <SceneName>Sc {number}. {name} </SceneName><ScenePoints>{props.event.points}p.</ScenePoints>
    <PlayerList>{players}</PlayerList>
  </EventWrapper>
)}

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Event
