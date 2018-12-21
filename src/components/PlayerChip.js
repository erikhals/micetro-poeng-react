import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ChipWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFDF72;
  color: #000000;
  height: 32px;
  margin: 0 5px 3px 0;
  padding: 0 12px;
  border-radius: 32px;
  font-size: 13px;
  cursor: ${props => props.clickable ? "pointer" : "auto"};
`
const ChipIcon = styled.div`
  display: block;
  float: left;
  background: #EFB532;
  width: 32px;
  height: 32px;
  line-height: 32px;
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
    <ChipWrapper onClick={handleClick} clickable={props.clickable}><ChipIcon>{props.number}</ChipIcon> {props.name}</ChipWrapper>
  )
};

PlayerChip.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleSwitch: PropTypes.func,
  clickable: PropTypes.bool
};

PlayerChip.defaultProps = {
  handleSwitch: () => {},
  clickable: true
}

export default PlayerChip;
