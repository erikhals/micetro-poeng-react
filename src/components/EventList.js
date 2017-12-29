import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event'


const EventList = ({events}) => {
  const eventNode = events.map((event) => <Event event={event} key={event.name} />)
return (<ul>{eventNode}</ul>)
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList
