import React from 'react';
import PropTypes from 'prop-types'

const PlayerChip = (props) => {

  const handleClick = () => {
    props.handleSwitch(props.id)
  }

  return(
    <button onClick={handleClick}>{props.number}. {props.name}</button>
  )
};

PlayerChip.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleSwitch: PropTypes.func
};

PlayerChip.defaultProps = {
  handleSwitch: () => {}
}

export default PlayerChip;
