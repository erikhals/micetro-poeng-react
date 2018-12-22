import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Event from './Event'

const Container = styled.ul`
  grid-column: 2;
  list-style: none;
  padding-left: 0px;
  margin: 0;
  background-color: #dddddd;
`

const EventList = props => {
  const eventNode = props.events.map(event => <Event event={event} key={event.key} playerData={props.playerData} />)
return (<Container>{eventNode}</Container>)
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList
