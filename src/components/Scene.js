import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayerChip from './PlayerChip'

const EventWrapper = styled.div`
  display: grid;
  grid-template: auto auto / auto auto;
  background-color: ${props => props.theme.backgroundDark};
  color: ${props => props.theme.text};
  padding: 16px 16px 0 16px;
  margins: 0px;
`
const EventHeader = styled.div`
  grid-area: 1 / 1;
  display: flex;
`

const SceneNumber = styled.div`
  display: flex;
  align-items: center;
`
const SceneName = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`
const ScenePoints = styled.div`
  grid-column: 2;
  grid-row: 1 / 3;
  justify-self: right;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.secondary};
  width: 2.5em;
  height: 2.5em;
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
  grid-column: 1 / 3;
  display: block;
  height: 1px;
  border: 0;
  border-bottom: 1px solid #ccc;
  margin: 0 0 0 0;
  padding-bottom: 8px;
`

const Scene = (props) => {
  const number = <SceneNumber>Sc {props.event.number}. </SceneNumber> 
  const scenePoints = <ScenePoints>{props.event.points}p.</ScenePoints>
  const name = props.event.name
  const  players = props.event.players.map(player => {
      const pData = props.playerData.find(playerD => playerD.key === player)
      return (<PlayerChip key={player} id={pData.number} number={pData.number} name={pData.name} clickable={false} />)
    })
 
  return (
    <EventWrapper>
      <EventHeader>{number} <SceneName> {name} </SceneName></EventHeader>
      <PlayerList>{players}</PlayerList>
      {scenePoints}
      <HorizontalLine />
    </EventWrapper>
  )
}

Scene.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Scene
