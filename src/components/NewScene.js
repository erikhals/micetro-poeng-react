import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {ButtonStyles} from "../style"

import PlayerChip from "./PlayerChip"

const NewSceneForm = styled.form`
  grid-column: 2;
  padding: 16px;
  background-color: ${props => props.theme.backgroundLight};
  color: #ffffff;

`
const SceneNameInput = styled.input`
  padding: 8px 8px;
  font-size: 1em;
  width: 100%;
`
const PointsWrapper = styled.div`
  display: flex;
  margin: 16px 0;
  align-items: center;
`

const PointsLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.backgroundDark};
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin: 0 5px;
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
  margin 16px 0;
`
const BenchWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 16px 0;
`

const Button = styled.button`
  ${ButtonStyles}
  width: 100%;
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
    />
  ))
  const stageNode = props.stage.map((player, index) => (
    <PlayerChip
      key={player.number}
      number={player.number}
      name={player.name}
      id={index}
      handleSwitch={props.playerToBench}
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
      <div>New Scene</div>
        <SceneNameInput type="text" name="scenename" placeholder="Scenename" />
        <PointsWrapper>Points: {pointRadios()}</PointsWrapper>
        <PlayersWrapper>Players: {stageNode}</PlayersWrapper>
        <Button
          type="submit"
          disabled={props.points < 1 || props.stage.length < 1}
        >
          Save scene
        </Button>
        <BenchWrapper>Bench: {benchNode}</BenchWrapper>
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
  submitScene: PropTypes.func.isRequired
}

NewScene.defaultProps = {
  stage: []
}

export default NewScene
