import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BackdropStyle = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  cursor: pointer;
  z-index: 100;
`

const Backdrop = props => <BackdropStyle onClick={props.click}/>

Backdrop.propTypes = {
  click: PropTypes.func.isRequired
}
      
export default Backdrop
