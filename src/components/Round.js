import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import PlayerChip from "./PlayerChip"

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundDark};
  color: ${props => props.theme.text};
  padding: 16px 16px 0 16px;
  margins: 0px;
`
const SceneNumber = styled.div`
  display: flex;
  align-items: center;
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

const Round = props => {
  let players = "Alle videre"
  if (props.event.players) {
    players = props.event.players.map(player => {
      const pData = props.playerData.find(playerD => playerD.key === player)
      return (
        <PlayerChip
          key = {player}
          id = {pData.number}
          number = {pData.number}
          name = {pData.name}
          clickable = {false}
          secondary
        />
      )
    })
  }
  return (
    <EventWrapper>
      <SceneNumber>Eliminations - Round {props.event.number}</SceneNumber>
      <PlayerList>{players}</PlayerList>
      <HorizontalLine />
    </EventWrapper>
  )
}

Round.propTypes = {
  event: PropTypes.objectOf(PropTypes.any).isRequired,
  playerData: PropTypes.arrayOf(PropTypes.any).isRequired
}

export default Round
