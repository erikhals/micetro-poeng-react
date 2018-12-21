import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerChip from './PlayerChip'

const EventWrapper = styled.li`
  background-color: #1F1F1F;
  color: #F5F5F5;
  padding: 16px;
`
const SceneName = styled.div`
  float: left;
`
const ScenePoints = styled.div`
  float: right;
  background: #227B9B;
  width: 46px;
  height: 46px;
  line-height: 46px;
  border-radius: 50%;
  text-align: center;
  color: white;
  margin: 0 8px 0 -12px;
`
const PlayerList = styled.ul`
  list-style: none;
  padding-left: 0px;
  clear: left;
  display: flex;
`
const HorizontalLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-bottom: 1px solid #ccc;
  margin: 2em 0 0 0;
  padding: 0;
`

const Event = (props) => {
  const number = props.event.number
  const name = props.event.name
  const players = props.event.players.map(player => {
    const pData = props.playerData.find(playerD => playerD.key === player)
    return(<PlayerChip key={player} id={pData.number} number={pData.number} name={pData.name} clickable={false}/>)})
return(
  <EventWrapper>
    <SceneName>Sc {number}. {name} </SceneName><ScenePoints>{props.event.points}p.</ScenePoints>
    <PlayerList>{players}</PlayerList>
    <HorizontalLine/>
  </EventWrapper>
)}

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Event
