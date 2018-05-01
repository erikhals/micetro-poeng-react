import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Event from './Event'

const EventListWrapper = styled.ul`
  list-style: none;
  padding-left: 0px;
`

const EventList = props => {
  const eventNode = props.events.map(event => <Event event={event} key={event.key} playerData={props.playerData} />)
return (<EventListWrapper>{eventNode}</EventListWrapper>)
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList
