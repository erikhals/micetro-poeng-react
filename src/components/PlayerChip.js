import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ChipWrapper = styled.div`
  display: inline-block;
  background: #e0e0e0;
  height: 32px;
  margin: 0 5px 3px 0;
  padding: 0 12px;
  border-radius: 32px;
  font-size: 13px;
  cursor: pointer;
`
const ChipIcon = styled.div`
  display: block;
  float: left;
  background: #009587;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  text-align: center;
  color: white;
  margin: 0 8px 0 -12px;
`

const PlayerChip = (props) => {

  const handleClick = () => {
    props.handleSwitch(props.id)
  }

  return(
    <ChipWrapper onClick={handleClick}><ChipIcon>{props.number}</ChipIcon> {props.name}</ChipWrapper>
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
