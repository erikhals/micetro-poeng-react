import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerChip from './PlayerChip'

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 100%;
  background-color: #1F1F1F;
  color: #F5F5F5;
  padding: 16px 16px 0 16px;
  margins: 0px;
`
const EventHeader = styled.div`
  display: flex;
`

const SceneNumber = styled.div`
  display: flex;
  align-items: center;
  &:before {
    content: "Sc ";
  }
  &:after {
    content: ".";
  }
`
const RoundNumber = styled.div`
  display: flex;
  align-items: center;
  &:before {
    content: "Round";
  }
  `
const SceneName = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
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
  margin: 0 0 0 -12px;
`
const PlayerList = styled.ul`
  list-style: none;
  padding-left: 0px;
  clear: left;
  display: flex;
  flex-wrap: wrap;
`
const HorizontalLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-bottom: 1px solid #ccc;
  margin: 0 0 0 0;
  padding-bottom: 8px;
`

const Event = (props) => {
  const number = props.event.points !== 0 ? <SceneNumber>{props.event.number}</SceneNumber> : ""
  const rNumber = props.event.points === 0 ? <RoundNumber>{props.event.number}</RoundNumber> : ""
  const scenePoints = props.event.points !== 0 ? <ScenePoints>{props.event.points}p.</ScenePoints> : ""
  const name = props.event.name
  let players = "Alle videre"
  if (props.event.players) {
    players = props.event.players.map(player => {
      const pData = props.playerData.find(playerD => playerD.key === player)
      return (<PlayerChip key={player} id={pData.number} number={pData.number} name={pData.name} clickable={false} />)
    })
  }
  return (
    <EventWrapper>
      <EventHeader>{number} <SceneName> {name} </SceneName> {rNumber} {scenePoints}</EventHeader>
      <PlayerList>{players}</PlayerList>
      <HorizontalLine />
    </EventWrapper>
  )
}

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Event
