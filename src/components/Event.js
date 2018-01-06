import React from 'react';
import PropTypes from 'prop-types';

const Event = (props) => (<li>{props.event.number}. {props.event.name}. {props.event.points}. </li>)

Event.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Event
