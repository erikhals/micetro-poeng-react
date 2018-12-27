import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ButtonStyles } from "../style"

import PlayerChip from "./PlayerChip"

const NewSceneForm = styled.form`
  grid-column: 2;
  padding: 16px;
  background-color: ${props => props.theme.backgroundDark};
  color: #ffffff;
`
const SceneWrapper = styled.div`
  background-color: ${props => props.theme.backgroundLight};
  padding: 1em;
  margin-bottom: 1em;
  display: grid;
  align-items: center;
`
const SceneNameInput = styled.input`
  padding: 8px 8px;
  font-size: 1em;
  box-sizing: border-box;
  width: 100%;
`
const PointsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 300px;
  margin-top: 0.5em;
  align-self: center;
  justify-content: space-between;
  align-items: center;
`

const PointsLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.backgroundDark};
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin: 0 ;
  cursor: pointer;
`
const PointsRadio = styled.input`
  position: absolute;
  opacity: 0;
  &:checked + ${PointsLabel} {
    background: ${props => props.theme.secondary};
  }
`
const PlayersWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.5em;
  min-height: 40px;
`
const BenchWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.5em;
  min-height: 80px;
`
const Button = styled.button`
  ${ButtonStyles}
  width: 100%;
  margin-top: 0.5em;
  &:disabled {
    background: silver;
    cursor: default;
  }
`

const NewScene = props => {
  const benchNode = props.bench.map((player, index) => (
    <PlayerChip
      key={player.number}
      number={player.number}
      name={player.name}
      id={index}
      handleSwitch={props.playerToStage}
      clickable
    />
  ))
  const stageNode = props.stage.map((player, index) => (
    <PlayerChip
      key={player.number}
      number={player.number}
      name={player.name}
      id={index}
      handleSwitch={props.playerToBench}
      clickable
    />
  ))
  const pointRadios = () => {
    const radios = []
    for (let i = 1; i < 6; i += 1) {
      radios.push(
        <div key={i}>
          <PointsRadio
            type="radio"
            name="points"
            id={`point${i}`}
            value={i}
            onChange={props.setPoints}
          />{" "}
          <PointsLabel htmlFor={`point${i}`}>{i}p</PointsLabel>{" "}
        </div>
      )
    }
    return radios
  }

  return (
    <NewSceneForm onSubmit={props.submitScene}>
      <SceneWrapper>
        Scene {props.eventNumber}: <SceneNameInput type="text" name="scenename" placeholder="Scenename" />
        <PointsWrapper>{pointRadios()}</PointsWrapper>
        <PlayersWrapper> {stageNode}</PlayersWrapper>
        <Button
          type="submit"
          disabled={props.points < 1 || props.stage.length < 1}
        >
          Save scene
        </Button>
      </SceneWrapper>
      <BenchWrapper> {benchNode}</BenchWrapper>
    </NewSceneForm>
  )
}

NewScene.propTypes = {
  bench: PropTypes.arrayOf(PropTypes.any).isRequired,
  stage: PropTypes.arrayOf(PropTypes.any),
  points: PropTypes.number.isRequired,
  playerToBench: PropTypes.func.isRequired,
  playerToStage: PropTypes.func.isRequired,
  setPoints: PropTypes.func.isRequired,
  submitScene: PropTypes.func.isRequired,
  eventNumber: PropTypes.number.isRequired
}

NewScene.defaultProps = {
  stage: []
}

export default NewScene
