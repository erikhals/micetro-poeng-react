import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event'


const EventList = props => {
  const eventNode = props.events.map(event => <Event event={event} key={event.number} playerData={props.playerData} />)
return (<ul>{eventNode}</ul>)
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList
