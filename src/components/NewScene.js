import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlayerChip from './PlayerChip'

class NewScene extends Component {
  constructor(props){
    super(props)
    this.state={
      bench: props.bench,
      stage: []
    }
    this.stagePlayer = this.stagePlayer.bind(this)
    this.benchPlayer = this.benchPlayer.bind(this)
  }

  stagePlayer(playerindex){
    const fromBench = this.state.bench
    const player = fromBench.splice(playerindex, 1)[0]
    const toStage = this.state.stage
    toStage.push(player)
    toStage.sort((a,b) =>  a.number - b.number);
    this.setState({
      bench: fromBench,
      stage: toStage
    })
  }

  benchPlayer(playerindex){
    const fromStage = this.state.stage
    const player = fromStage.splice(playerindex, 1)[0]
    const toBench = this.state.bench
    toBench.push(player)
    toBench.sort((a,b) =>  a.number - b.number);
    this.setState({
      bench: toBench,
      stage: fromStage
    })
  }

  render() {
    const benchNode = this.state.bench.map((player, index) => <PlayerChip key={player.number} number={player.number} name={player.name} id={index} handleSwitch={this.stagePlayer}/>)
    const stageNode = this.state.stage.map((player, index) => <PlayerChip key={player.number} number={player.number} name={player.name} id={index} handleSwitch={this.benchPlayer}/>)
    const pointRadios = () => {
      const radios = []
      for(let i=1; i<6; i+=1){
        radios.push(<div key={i}><input type="radio" id={`point${i}`} name="points" /><label htmlFor={`point${i}`}>{i}p</label></div>)
      }
      return radios
    }
    const radios = pointRadios()
    return (
      <div>
        <div>New Scene</div>
        <input type="text" placeholder="Name"/>
        <div>Points: {radios}</div>
        <div>Players: {stageNode}</div>
        <div>Bench: {benchNode}</div>
        <button>Save</button>
      </div>
    )
  }
}

NewScene.propTypes = {
  bench: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default NewScene;
