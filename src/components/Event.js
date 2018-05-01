import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EventWrapper = styled.li`
  color: F5F5F5;
  padding: 16px;
`

const PlayerList = styled.ul`
  list-style: none;
  padding-left: 0px;
`

const Event = (props) => {
  const number = props.event.number
  const name = props.event.name
  const players = props.event.players.map(player => {
    const pData = props.playerData.find(playerD => playerD.key === player)
    return(<li key={player}>{pData.number}. {pData.name}</li>)})
return(<EventWrapper>Sc {number}. {name} {props.event.points}p. <PlayerList>{players}</PlayerList></EventWrapper>)
}

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Event
