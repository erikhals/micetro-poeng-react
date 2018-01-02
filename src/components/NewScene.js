import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewScene extends Component {
  constructor(props){
    super(props)
    this.state={
      bench: props.bench,
      stage: []
    }
  }

  render(bench) {
    const benchNode = bench.map((player) => <button id={player.number}>{player.number}. {player.name}</button>)
    const stageNode = this.state.stage
    return (
      <div>
        <div>Scene points {stageNode}</div>
        <input type="text"/>
        <div>{benchNode}</div>
        <button>Save</button>
      </div>
    )
  }

}

NewScene.propTypes = {
  bench: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default NewScene;
