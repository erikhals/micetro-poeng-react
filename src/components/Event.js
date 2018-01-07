import React from 'react';
import PropTypes from 'prop-types';

const Event = (props) => {
  const number = props.event.number
  const name = props.event.name
  const players = props.event.players.map((player) => <li key={player.number}>{player.number}. {player.name}</li>)
return(<li>Sc {number}. {name} {props.event.points}p. <ul>{players}</ul></li>)
}

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Event
