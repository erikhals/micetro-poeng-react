import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ChipWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.text};
  background: ${props => props.secondary ? props.theme.secondary : props.theme.primary};
  height: 32px;
  margin: 0 8px 8px 0;
  padding: 0 12px;
  border-radius: 32px;
  font-size: 13px;
  cursor: ${props => props.clickable ? "pointer" : "auto"};
  &.secondary {
    background: ${props => props.theme.secondary};
  }
`
const ChipIcon = styled.div`
  display: block;
  float: left;
  background: ${props => props.secondary ? props.theme.secondaryDark : props.theme.primaryDark};
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  text-align: center;
  margin: 0 8px 0 -12px;
`

const PlayerChip = (props) => {

  const handleClick = () => {
    props.handleSwitch(props.id)
  }

  return (
    <ChipWrapper onClick={handleClick} clickable={props.clickable} secondary={props.secondary}><ChipIcon secondary={props.secondary}>{props.number}</ChipIcon> {props.name}</ChipWrapper>
  )
};

PlayerChip.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleSwitch: PropTypes.func,
  clickable: PropTypes.bool,
  secondary: PropTypes.bool
};

PlayerChip.defaultProps = {
  handleSwitch: () => { },
  clickable: true,
  secondary: false
}

export default PlayerChip;
